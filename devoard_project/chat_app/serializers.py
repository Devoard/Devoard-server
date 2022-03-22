from rest_framework import serializers
from user.models import user_info
from .models import chat
 

class ChatSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = chat
        fields = ['sender', 'receiver', 'chat_body', 'time_stamp', 'read']

class ChatListSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(many=False, slug_field='username', queryset=user_info.objects.all())
    receiver = serializers.SlugRelatedField(many=False, slug_field='username', queryset=user_info.objects.all())
    class Meta:
        model = chat
        fields = ['sender', 'receiver', 'chat_body', 'time_stamp', 'read']