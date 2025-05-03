from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile = models.ImageField(blank=True, null=True)