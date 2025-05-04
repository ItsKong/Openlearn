from rest_framework import serializers
from user_service.models import UserModel
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['user', 'profile']

User = get_user_model()
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
        # Add email as an alternative field
    email = serializers.CharField(required=False)
    username = serializers.CharField(required=False)
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Make username field optional
        self.fields['username'].required = False

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['user_id'] = user.id
        token['username'] = user.username
        token['f_name'] = user.first_name
        token['l_name'] = user.last_name
        return token
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if not email:
            raise serializers.ValidationError(
                ("email must be provided")
            )
          # Now proceed with standard validation

        try:
            user = User.objects.get(email=email)
            attrs['username'] = user.username  # Set username for authentication
        except User.DoesNotExist:
            raise serializers.ValidationError(
                ("No user found with this email address")
            )
        
        # Now proceed with standard validation
        # data = super().validate(attrs)
        
        # Add user data to the response if needed
        # user = self.user
        # data.update({
        #     'user_id': user.id,
        #     'username': user.username,
        #     'email': user.email,
        #     'first_name': user.first_name,
        #     'last_name': user.last_name,
        # })
        
        return super().validate(attrs)