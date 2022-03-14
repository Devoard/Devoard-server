from rest_framework import serializers
from user.models import user_info
from .models import chat
 

class ChatSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = chat
        fields = '__all__'

class ChatListSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(many=False, slug_field='username', queryset=user_info.objects.all())
    receiver = serializers.SlugRelatedField(many=False, slug_field='username', queryset=user_info.objects.all())
    # chat_list = serializers.SerializerMethodField()
    class Meta:
        model = chat
        fields = ['sender', 'receiver', 'chat_body', 'time_stamp', 'read']
        ordering = ('time_stamp',)
    
    # def get_chat_list(self, instance):
    #     chat_lists = instance.chat_list.all().order_by('time_stamp')
    #     return 