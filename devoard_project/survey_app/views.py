from rest_framework.response import Response
from rest_framework.views import APIView
from user.models import user_info, user_skill
from .serializers import SurveySerializer
from rest_framework import status
from user.serializers import UserSerializer, UserSerializerWithToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

# Create your views here.

class survey(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):
        serializer = SurveySerializer(data=request.data)
        # username = 'dvlops87' # 사용자 아이디 (실험용)
        
        username = serializer.initial_data['username'] # 사용자 아이디
        user_field = serializer.initial_data['user_field'] # 하고 싶은 개발분야
        user_skill_name = serializer.initial_data['user_skill_name'] # 사용 가능한 기술 스택(리스트)
        user_period = serializer.initial_data['user_period'] # 프로그래밍 공부한 기간
        user_active = serializer.initial_data['user_active'] # 예상 활동 기간
        user_time = serializer.initial_data['user_time'] # 활동 가능 시간
        user_how = serializer.initial_data['user_how'] # 선호하는 진행 방식
        user_exp = serializer.initial_data['user_exp'] # 프로젝트 경험
        user_import = serializer.initial_data['user_import'] # 중요하게 생각하는 요소
        user_intro = serializer.initial_data['user_intro'] # 자기 소개
        user_plan = serializer.initial_data['user_plan'] # 계획하는 프로젝트
        user_tmi = serializer.initial_data['user_tmi'] # 하고 싶은 말
        user_git_id = serializer.initial_data['user_git_id'] # 깃헙 아이디

        try :
            user = user_info.objects.get(username=username)
        except :
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)
        user.user_field = user_field
        user.user_period = user_period
        user.user_active = user_active
        user.user_time = user_time
        user.user_how = user_how
        user.user_exp = user_exp
        user.user_import = user_import
        user.user_intro = user_intro
        user.user_plan = user_plan
        user.user_tmi = user_tmi
        user.user_git_id = user_git_id
        user_skill_name = user_skill_name.split(',')
        for skill in user_skill_name:
            user_skill.objects.create(u_id = user, user_skill_name=skill, user_score = 0)
        user.save()
        return Response('설문이 완료되었습니다.',status=status.HTTP_201_CREATED)
        
        