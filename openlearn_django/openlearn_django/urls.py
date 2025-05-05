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
from django.urls import path, include
from user_service.views import *
from courses.views import *

urlpatterns = [
    # ========= user_service app ==========
    path('admin/', admin.site.urls),
    path('api/register/', register, name='register'),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),   # login
    path('api/token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),  # refresh
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/userall/', UserView.as_view(), name='userinfo'),
    path('api/profile/', ProfileView.as_view(), name='user_profile'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/save_course_view/', viewSaveList.as_view(), name='view_saved'),
    path('api/saveCouse/<int:courseId>', Save_Course_by_Id.as_view(), name='saving_course'),
    path('api/updateProfile/', updateUser.as_view(), name='updating_user'),
    
    # ========= course app ==========
    path('api/course/all/', courseView, name='couse_view_all'),
    path('api/video/all/', videoView, name='video_view_all'),
    path('api/insert/vid', insertVideoMany),
    path('api/course/<int:courseId>', courseViewOne, name='couse_view_one'),
    path('api/video/<int:courseId>', videoByCourseId, name='video_view_by_course'),
    path('api/video/byid/<int:videoId>', videoById, name='video_by_id'),
    # path('', include('courses.urls')),
    path('api/search/<str:query>', searchCourse, name='searching'),
]
