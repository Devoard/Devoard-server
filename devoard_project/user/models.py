from operator import mod
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class user_info(AbstractUser):
    user_name = models.CharField(max_length=30)
    user_job = models.CharField(max_length=20, blank=True)
    user_import = models.CharField(max_length=40,blank=True)
    user_exp = models.IntegerField(default=0)
    user_how = models.IntegerField(default=0)
    user_intro = models.TextField(default=0)
    user_pf_addr = models.TextField(default=0)
    user_join_project = models.TextField(default=0)
    user_connect = models.CharField(max_length=50,blank=True)
    def __str__(self):
        return self.user_name

class user_skill(models.Model):
    user_skill_name = models.CharField(max_length=50)
    user_score = models.IntegerField(default=0)
    def __str__(self):
        return self.user_skill_name