"""
URL configuration for openlearn_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from user_service.views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', register, name='register'),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),   # login
    path('api/token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),  # refresh
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/userall/', UserView.as_view(), name='userinfo'),
    path('api/profile/', ProfileView.as_view(), name='user_profile'),
]
