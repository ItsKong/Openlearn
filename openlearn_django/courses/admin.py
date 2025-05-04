from django.contrib import admin
from courses.models import CourseModel, VideoModel
# Register your models here.

admin.site.register(CourseModel)
admin.site.register(VideoModel)