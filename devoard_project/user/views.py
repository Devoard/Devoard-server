from django.shortcuts import render
from django.http import HttpResponseRedirect, QueryDict
from django.contrib.auth.models import User
from rest_framework import permissions, status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from .models import user_info

# from google.oauth2 import id_token
# from google.auth.transport import requests

# Create your views here.
@api_view(('GET',))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def current_user(request):

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        username = serializer.initial_data['username']
        password = serializer.initial_data['password']
        user_name = serializer.initial_data['user_name']
        try :
            user = user_info.objects.get(username=username)
        except:
            return Response('존재 하지 않는 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)
        user_qd = QueryDict('username='+user.username+'&password='+user.password+'&user_name='+user.user_name+'&user_exp='+str(user.user_exp)+'&user_job='+str(user.user_job)+'&user_import='+str(user.user_import)+'&user_how='+str(user.user_how)+'&user_pf_addr='+str(user.user_pf_addr)+'&user_join_project='+str(user.user_join_project)+'&user_connect='+str(user.user_connect))
        if user_qd is not None:
            user_serializer = UserSerializer(data=user_qd)
            if user_serializer.is_valid():
                return Response('다시 입력해주세요.', status=status.HTTP_400_BAD_REQUEST)
            else :
                return Response(user_serializer.initial_data, status=status.HTTP_200_OK)
        else :
            return Response('존재 하지 않는 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)
        
@api_view(('GET',))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def validate_jwt_token(request):

    try:
        token = request.META['HTTP_AUTHORIZATION']
        data = {'token': token.split()[1]}
        valid_data = VerifyJSONWebTokenSerializer().validate(data)
    except Exception as e:
        return Response(e)

    return Response(status=status.HTTP_200_OK)