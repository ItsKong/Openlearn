from django.db import models
from django.contrib.auth.models import User
from courses.models import CourseModel
# Create your models here.

class UserModel(models.Model):
    user = models.OneToOneField(User, related_name='user_addi',on_delete=models.CASCADE)
    save_course = models.ManyToManyField(CourseModel, related_name='user_save', blank=True) 