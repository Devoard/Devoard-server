from dataclasses import field
from rest_framework import serializers
from user.models import user_info, user_skill
from .models import project
from devoard_app.models import devoard
from devoard_app.serializers import devoardSerializer



class MyDevoardSerializer(serializers.ModelSerializer):
    writer = serializers.SlugRelatedField(many=False, slug_field='username', queryset=user_info.objects.all())
    class Meta:
        model = devoard
        fields = ('title', 'field', 'body', 'done', 'writer', 'id')


class ProjectSerializer(serializers.ModelSerializer):
    team_master = serializers.SlugRelatedField(many=False, slug_field='username', queryset=user_info.objects.all())
    joiner = serializers.SlugRelatedField(many=True, slug_field='username', queryset=user_info.objects.all())
    project_detail = MyDevoardSerializer(many = False)    
    class Meta:
        model = project
        fields = ['project_detail','team_master', 'joiner', 'id']

class UserskillSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_skill
        fields = ('user_skill_name', 'user_score')

class UserSerializer(serializers.ModelSerializer):
    u_skill = UserskillSerializer(many = True)
    class Meta:
        model = user_info
        fields = ('username', 'user_field', 'user_exp', 'user_import', 'user_connect', 'user_pf_addr', 'u_skill')


class ApplyDevoardSerializer(serializers.ModelSerializer):
    project_detail = serializers.SlugRelatedField(slug_field='title', queryset=project.objects.all())
    team_master = UserSerializer(many=False, read_only=True)
    joiner = UserSerializer(many=True, read_only=True)
    awaiter = UserSerializer(many=True, read_only=True)
    class Meta:
        model = project
        fields = ['project_detail','team_master', 'joiner','awaiter', 'id']