from django.db import models

# Create your models here.
class CourseModel(models.Model):
    title = models.CharField(max_length=255)
    tutor = models.CharField(max_length=255)
    img = models.CharField(max_length=255, null=True, blank=True)
    detail = models.CharField(max_length=255)
    created_at = models.DateField(auto_now=True)
    thumbnail = models.CharField(max_length=255, null=True, blank=True)


class VideoModel(models.Model):
    course = models.ForeignKey(CourseModel, related_name='videos', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    video_url = models.CharField(max_length=255)
    created_at = models.DateField(auto_now=True)
    thumbnail = models.CharField(max_length=255, null=True, blank=True)
    detail = models.CharField(max_length=255, null=True, blank=True)

