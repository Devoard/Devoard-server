from dataclasses import fields
from rest_framework import serializers
from .models import devoard
from user.models import user_info

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_info
        fields = ('id', 'username','git_userImg')

class devoardSerializer(serializers.ModelSerializer):
    writer =  UserInfoSerializer(many = False)
    class Meta:
        model = devoard
        fields = ('id','title', 'frontend_cnt', 'backend_cnt', 'android_cnt', 'ios_cnt', 'data_cnt', 'devops_cnt', 'body', 'period', 'done', 'recruit_state','field', 'writer','belong')

class devoardNowSerializer(serializers.ModelSerializer):
    writer =  UserInfoSerializer(many = False)
    class Meta:
        model = devoard
        fields = ('id', 'title', 'body', 'recruit_state', 'writer')