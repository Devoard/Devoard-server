from rest_framework import serializers
from .models import devoard

class devoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = devoard
        fields = ('title', 'body', 'field', 'recruit_cnt', 'situate', 'done', 'user_id')