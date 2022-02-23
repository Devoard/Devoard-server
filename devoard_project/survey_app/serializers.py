from rest_framework import serializers
from user.models import user_info

class SurveySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = user_info
        fields = '__all__'
        