from rest_framework import serializers
from .models import devoard

class devoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = devoard
        fields = ('id','title', 'frontend_cnt', 'backend_cnt', 'android_cnt', 'ios_cnt', 'data_cnt', 'devops_cnt', 'body', 'period', 'done', 'recruit_state','field', 'writer')