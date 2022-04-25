from django.db import models
from user.models import user_info

# Create your models here.
class devoard(models.Model):
    title = models.CharField(max_length=50) #프로젝트 명
    frontend_cnt = models.CharField(max_length=50) #모집인원
    backend_cnt = models.CharField(max_length=50) #모집인원
    android_cnt = models.CharField(max_length=50) #모집인원
    ios_cnt = models.CharField(max_length=50) #모집인원
    data_cnt = models.CharField(max_length=50) #모집인원
    devops_cnt = models.CharField(max_length=50) #모집인원
    body = models.TextField(default=0) #프로젝트 설명
    period = models.TextField(default=0) #예상 개발기간
    done = models.CharField(max_length=50) #현재 진행 상황
    recruit_state = models.BooleanField(default=True) 
    date = models.CharField(max_length=50, null=True)
    
    def __str__(self):
        return self.title