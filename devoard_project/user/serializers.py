from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
# from django.contrib.auth.models import User
from .models import user_info, user_skill
from project_app.serializers import UserskillSerializer

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = user_info
        fields = ('username','user_name', 'id', 'user_job', 'user_import', 'user_exp', 'user_how', 'user_intro', 'user_pf_addr', 'user_join_project','user_connect','user_time')


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = user_info
        fields = ('token', 'username','password')

class MypageSerializer(serializers.ModelSerializer):
    u_skill = UserskillSerializer(many = True)
    class Meta:
        model = user_info
        fields = ('username', 'id', 'user_job', 'user_import', 'user_exp', 'user_how', 'user_intro', 'user_pf_addr','user_connect', 'u_skill','user_time')
