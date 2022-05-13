from rest_framework import serializers
from .models import alter
from project_app.models import project
from devoard_app.models import devoard
from user.models import user_info


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_info
        fields = ('username', 'user_git_id','user_connect')

class AlterSerializer(serializers.ModelSerializer):
    devoard_data = serializers.SlugRelatedField(many=False, slug_field='title', queryset=devoard.objects.all())
    class Meta:
        model = alter
        fields = ('id','data','devoard_data')

class AlterDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    devoard_data = serializers.SlugRelatedField(many=False, slug_field='title', queryset=devoard.objects.all())
    team_master = UserSerializer(many=False, read_only=True)
    class Meta:
        model = alter
        fields = ('id','user','title','data','team_master','devoard_data')

