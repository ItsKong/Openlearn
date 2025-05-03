from user_service.serializers import UserModelSerializer, CustomTokenObtainPairSerializer
from user_service.authentication import CookieJWTAuthentication
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.conf import settings
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# Create your views here.

@csrf_exempt
@permission_classes([AllowAny])
def register(request):
    if request.method == 'POST':
        try:
            # For regular JSON data (without files)
            if 'application/json' in request.content_type:
                data = JSONParser().parse(request)
                profile_image = None
            # For multipart/form-data (with files)
            else:
                data = request.POST.dict()
                profile_image = request.FILES.get('profile', None)
            # Check username availability
            print("Receive: ", data)
            if User.objects.filter(username=data['f_name']).exists():
                return JsonResponse({"error": "Username already used."}, status=400)
            try:
                new_user = User.objects.create_user(
                    username=data['username'],
                    email=data['email'],
                    password=data['password'],
                    first_name=data['f_name'],
                    last_name=data['l_name'],
                )
            except Exception as e:
                return JsonResponse({"error":"Fail to create user", "message": str(e)}, status=400)
            new_user.save()
            data['user'] = new_user.id
            user_serialize = UserModelSerializer(data=data)
            if user_serialize.is_valid():
                user_serialize.save()
                token_serializer = CustomTokenObtainPairSerializer(data={
                    'username': data['username'],
                    'password': data['password']
                })
                if token_serializer.is_valid():
                    tokens = token_serializer.validated_data

                    response = JsonResponse(user_serialize.data, status=201)

                    response.set_cookie('access', tokens['access'], httponly=True, secure=False, samesite='Lax')
                    response.set_cookie('refresh', tokens['refresh'], httponly=True, secure=False, samesite='Lax')

                    return response
                else:
                    new_user.delete()
                    return JsonResponse({"error": "Token creation failed"}, status=400)
            new_user.delete()
        except Exception as e:
            return JsonResponse({"error":"data not valid", "message": str(e)}, status=400)
    return JsonResponse({"error":"method not allowed."}, status=405)

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content ={
            'message': 'test success'
        }
        return Response(content)

@method_decorator(csrf_exempt, name='dispatch')
class ProfileView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            # Add other fields as needed
        }
        return Response(data)

class LogoutView(APIView):
    def post(self, request):
        response = Response({"detail": "Successfully logged out."})
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print("request receive: ", request.data)
        serializer.is_valid(raise_exception=True)
        response = Response(serializer.validated_data)
        access_token = serializer.validated_data.get('access')
        refresh_token = serializer.validated_data.get('refresh')
        if access_token:
            response.set_cookie(
                'access_token',
                access_token,
                httponly=True,
                secure=settings.DEBUG is False, # Only set secure in production
                samesite='Lax'
            )
        if refresh_token:
            response.set_cookie(
                'refresh_token',
                refresh_token,
                httponly=True,
                secure=settings.DEBUG is False,
                samesite='Lax'
            )
        return response

class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except Exception:
            return Response({'detail': 'Invalid refresh token'}, status=status.HTTP_401_UNAUTHORIZED)

        access = serializer.validated_data["access"]
        response = Response({'detail': 'Token refreshed'}, status=200)

        # Set the new access token in an HTTP-only cookie
        response.set_cookie(
            key='access_token',
            value=access,
            httponly=True,
            secure=True,  # Set False for local dev only
            samesite='Lax',
            max_age=60 * 5  # 5 minutes
        )
        return response