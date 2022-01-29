from user.serializers import UserSerializer
from .models import user_info

def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user_info, context={'request': request}).data
    }