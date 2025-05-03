from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import exceptions
from django.conf import settings
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Get the token from cookie
        raw_token = request.COOKIES.get('access_token')
        
        if raw_token is None:
            return None
        
        try:
            validated_token = self.get_validated_token(raw_token)
            user = self.get_user(validated_token)
            return (user, validated_token)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        except Exception as e:
            raise exceptions.AuthenticationFailed(str(e))