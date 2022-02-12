from django.db import models
from user.models import user_info

# Create your models here.
class devoard(models.Model):
    title = models.CharField(max_length=50)
    body = models.TextField(default=0)
    field = models.IntegerField(default=0)
    recruit_cnt = models.IntegerField(default=0)
    situate = models.IntegerField(default=0)
    done = models.IntegerField(default=0)
    user_id = models.ForeignKey('user.user_info',on_delete=models.CASCADE, default='',related_name='user_id')
    
    def __str__(self):
        return self.title

class project(models.Model):
    openner = models.TextField(default=0)
    joinner = models.TextField(default=0)
    awaiter = models.TextField(default=0)
    def __str__(self):
        return self.openner

class chat(models.Model):
    user_one = models.ForeignKey('user.user_info',on_delete=models.CASCADE, default='',related_name='user_one')
    user_two = models.ForeignKey('user.user_info',on_delete=models.CASCADE, default='',related_name='user_two')
    chat = models.TextField(default=0)