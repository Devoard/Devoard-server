from django.shortcuts import render, redirect
from django.conf import settings
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

from allauth.socialaccount.providers import github
from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.github import views as github_view
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
import requests
from allauth.socialaccount.models import SocialAccount
from django.http import JsonResponse
from json import JSONDecodeError
from django.urls import reverse
from rest_framework.authtoken.models import Token

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
        try :
            username = serializer.initial_data['username']
            user = user_info.objects.filter(username=username).first()
        except:
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)
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
    

BASE_URL = 'http://localhost:8000/'
GITHUB_CALLBACK_URI = BASE_URL + 'user/github/callback/'
def github_login(request):
    client_id = getattr(settings, 'GIT_CLIENT_ID')
    return redirect(
        f"https://github.com/login/oauth/authorize?client_id={client_id}&redirect_uri={GITHUB_CALLBACK_URI}"
    )
def github_callback(request):
    client_id = getattr(settings, 'GIT_CLIENT_ID')
    client_secret = getattr(settings, 'GIT_CLIENT_SECRETS')
    code = request.GET.get('code')
    """
    Access Token Request
    """
    token_req = requests.post(
        f"https://github.com/login/oauth/access_token?client_id={client_id}&client_secret={client_secret}&code={code}&accept=&json&redirect_uri={GITHUB_CALLBACK_URI}&response_type=code", headers={'Accept': 'application/json'})
    token_req_json = token_req.json()
    error = token_req_json.get("error")
    if error is not None:
        raise JSONDecodeError(error)
    access_token = token_req_json.get('access_token')
    """
    Email Request
    """
    user_req = requests.get(f"https://api.github.com/user",
                            headers={"Authorization": f"Bearer {access_token}"})
    user_json = user_req.json()
    error = user_json.get("error")
    if error is not None:
        raise JSONDecodeError(error)
    print(user_json)
    email = user_json.get("email")
    login = user_json.get("login")
    avatar_url = user_json.get("avatar_url") 
    """
    Signup or Signin Request
    """
    try:
        user = user_info.objects.get(username=login)
        # 기존에 가입된 유저의 Provider가 github가 아니면 에러 발생, 맞으면 로그인
        # 다른 SNS로 가입된 유저
        social_user = SocialAccount.objects.get(user=user)
        if social_user is None:
            return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)
        if social_user.provider != 'github':
            return JsonResponse({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)
        # 기존에 github로 가입된 유저
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(
            f"{BASE_URL}user/github/login/finish/", data=data)
        accept_status = accept.status_code
        print('오류: ',accept_status)
        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signin'}, status=accept_status)
        accept_json = accept.json()
        accept_json.pop('user', None)
        print(accept_json['token'])
        # response = redirect('home')
        response = HttpResponseRedirect('http://localhost:8000/')
        response.set_cookie('git_token',accept_json['token'])
        response.set_cookie('git_userImg',avatar_url)
        token = Token.objects.get_or_create(user=user)
        print(token)
        response.set_cookie('token',token)
        response.set_cookie('signin','signin')
        return response
        # return JsonResponse(accept_json)
    except user_info.DoesNotExist:
        # 기존에 가입된 유저가 없으면 새로 가입
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(
            f"{BASE_URL}user/github/login/finish/", data=data)
        accept_status = accept.status_code
        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signusp'}, status=accept_status)
        # user의 pk, email, first name, last name과 Access Token, Refresh token 가져옴
        accept_json = accept.json()
        accept_json.pop('user', None)
        print(accept_json['token'])
        # response = redirect('home')
        response = HttpResponseRedirect('http://localhost:8000/')
        response.set_cookie('git_token',accept_json['token'])
        response.set_cookie('git_userImg',avatar_url)
        new_user = user_info.objects.get(username=login)
        token = Token.objects.create(user=new_user)
        print(token)
        response.set_cookie('token',token)
        response.set_cookie('signup','signup')
        return response
        # return HttpResponseRedirect(accept_json,settings.LOGIN_REDIRECT_URL)
        # return render(request,'index.html',accept_json)
class GithubLogin(SocialLoginView):
    """
    If it's not working
    You need to customize GitHubOAuth2Adapter
    use header instead of params
    -------------------
    def complete_login(self, request, app, token, **kwargs):
        params = {'access_token': token.token}
TO
def complete_login(self, request, app, token, **kwargs):
        headers = {'Authorization': 'Bearer {0}'.format(token.token)}
    -------------------
    """
    adapter_class = github_view.GitHubOAuth2Adapter
    callback_url = GITHUB_CALLBACK_URI
    client_class = OAuth2Client
