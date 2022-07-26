from operator import mod
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class user_info(AbstractUser):
    search_fields = ["user_name",]
    user_name = models.CharField(max_length=30)
    user_period = models.CharField(max_length=20, blank=True)
    user_active = models.CharField(max_length=20, blank=True)
    user_plan = models.TextField(default=0)
    user_tmi = models.TextField(default=0)
    user_join_project = models.TextField(default=0)
    user_plan = models.CharField(max_length=50,blank=True)
    user_git_id = models.CharField(max_length=50,blank=True)
    user_field = models.CharField(max_length=30,null=True)
    
    #정보+설문
    user_how = models.CharField(max_length=40,blank=True)
    user_exp = models.CharField(max_length=40,blank=True)
    user_pf_addr = models.TextField(default=0)
    user_intro = models.TextField(default=0)
    user_connect = models.CharField(max_length=50,blank=True)
    user_import = models.CharField(max_length=40,blank=True)
    user_time = models.CharField(max_length=50,blank=True )
    user_job = models.IntegerField(default=0)
    git_userImg = models.TextField(default=0)
    u_skill = models.ManyToManyField("user_skill", related_name="user_skill_list") 
    def __str__(self):
        return self.username

class user_skill(models.Model):
    u_id = models.ForeignKey("user_info", related_name="user", on_delete=models.CASCADE, db_column="user_id")
    user_skill_name = models.CharField(max_length=50)
    def __str__(self):
        return self.user_skill_name