from user_service.serializers import UserModelSerializer, CustomTokenObtainPairSerializer
from user_service.authentication import CookieJWTAuthentication
from user_service.models import *
from courses.models import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.db.models import Count
from django.contrib.auth.hashers import check_password
from django.utils.decorators import method_decorator
from django.conf import settings
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# Create your views here.

@csrf_exempt
@permission_classes([AllowAny])
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        print(request.method)
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
            data['email'] = data['email'].lower()
            if User.objects.filter(username=data['username']).exists():
                return JsonResponse({"error": "Username already used."}, status=400)
            elif User.objects.filter(email=data['email']).exists():
                return JsonResponse({"error": "Email already used."}, status=400)
            try:
                new_user = User.objects.create_user(
                    username=data['username'],
                    email=data['email'],
                    password=data['password'],
                    first_name=data['f_name'],
                    last_name=data['l_name'],
                )
                new_user.save()
            except Exception as e:
                return JsonResponse({"error":"Fail to create user", "message": str(e)}, status=400)
            user_data = {
                'user': new_user.id # <---- fix error token failed
            }
            user_serialize = UserModelSerializer(data=user_data)
            print(user_serialize.is_valid())
            if user_serialize.is_valid():
                user_serialize.save()
                token_serializer = CustomTokenObtainPairSerializer(data={
                    'email': data['email'],
                    'password': data['password']
                })
                if token_serializer.is_valid():
                    tokens = token_serializer.validated_data

                    response = JsonResponse(user_serialize.data, status=201)
                    access_token = tokens['access']
                    refresh_token = tokens['refresh']
                    if access_token:
                        response.set_cookie(
                            'access_token',
                            access_token,
                            httponly=True,
                            secure=True, # Only set secure in production
                            samesite='None',
                            max_age=60 * 5 
                        )
                    if refresh_token:
                        response.set_cookie(
                            'refresh_token',
                            refresh_token,
                            httponly=True,
                            secure=True,
                            samesite='None',
                            max_age=60 * 60 * 24
                        )

                    return response
                else:
                    new_user.delete()
                    return JsonResponse({"error": "Token creation failed"}, status=400)
            else:
                new_user.delete()
                return JsonResponse({"error": "User serialize failed"}, status=400)
        except Exception as e:
            return JsonResponse({"error":"data not valid", "message": str(e)}, status=400)
    else:
        return JsonResponse({"error":"method not allowed."}, status=405)

class updateUser(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    # username: "",
    #   f_name: "",
    #   l_name: "",
    #   email: "",
    #   old_pass: "",
    #   pass: "",
    #   c_pass: "",
    #   file: null,

    def post(self, request):
        user_model = UserModel.objects.get(user=request.user)
        if 'application/json' in request.content_type:
                data = JSONParser().parse(request)
                profile_image = None
            # For multipart/form-data (with files)
        else:
            data = request.POST.dict()
            profile_image = request.FILES.get('file', None)
         # Extract fields
        username = data.get('username', '').strip()
        f_name = data.get('f_name', '').strip()
        l_name = data.get('l_name', '').strip()
        old_pass = data.get('old_pass', '')
        new_pass = data.get('pass', '')
        c_pass = data.get('c_pass', '')

        # Validate password match
        if new_pass or c_pass:
            if new_pass != c_pass:
                return Response({'detail': 'Passwords do not match'}, status=400)
            if not check_password(old_pass, request.user.password):
                return Response({'detail': 'Old password is incorrect'}, status=400)
            request.user.set_password(new_pass)

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already used."}, status=400)

        # Update basic info
        request.user.username = username or request.user.username
        request.user.first_name = f_name or request.user.first_name
        request.user.last_name = l_name or request.user.last_name
        request.user.save()

        # # Update profile image if present
        # if profile_image:
        #     user_model.profile = profile_image  # Assuming "profile" is the field name
        #     user_model.save()

        return Response({'detail': 'User updated successfully'})



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
    
class viewSaveList(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            userId = request.user.id
            user_model = UserModel.objects.get(user=userId)
            
            # Get the saved courses
            saved_courses =  user_model.save_course.annotate(
                video_count=Count('videos')
            ).values(
                'id', 'title', 'tutor', 'img', 'detail', 'created_at', 'thumbnail', 'video_count'
            )

            # Return the list of saved courses
            return JsonResponse(list(saved_courses), safe=False)
        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)


class Save_Course_by_Id(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, courseId):
        try:
            user_model = UserModel.objects.get(user=request.user)
            course = CourseModel.objects.get(id=courseId)

            if course in user_model.save_course.all():
                user_model.save_course.remove(course)
                return JsonResponse({'message': 'Course unsaved'})
            else:
                user_model.save_course.add(course)
                return JsonResponse({'message': 'Course saved'})
        except Exception as e:
            return JsonResponse({'error': 'Someting wrong', 'message': str(e)}, status=404)
        
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
                secure=True, # Only set secure in production
                samesite='None',
                max_age=60 * 5 
            )
        if refresh_token:
            response.set_cookie(
                'refresh_token',
                refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                max_age=60 * 60 * 24
            )
        return response


class CookieTokenRefreshView(TokenRefreshView):
    serializer_class = TokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            return Response({'detail': 'No refresh token provided'}, status=401)
        
        serializer = self.get_serializer(data={'refresh': refresh_token})

        try:
            serializer.is_valid(raise_exception=True)
        except Exception:
            return Response({'detail': 'Invalid refresh token'}, status=401)

        access_token = serializer.validated_data["access"]
        response = Response({'detail': 'Token refreshed'}, status=200)

        # Set the new access token in an HTTP-only cookie
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=True,  # Set False for local dev only
            samesite='None',
            max_age=60 * 5  # 5 minutes
        )
        return response