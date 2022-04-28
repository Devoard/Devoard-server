from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProjectSerializer ,MyDevoardSerializer, ApplyDevoardSerializer
from .models import project
from devoard_app.serializers import devoardSerializer
from user.models import user_info
from devoard_app.models import devoard
from rest_framework.authentication import TokenAuthentication
from django.db.models import Q

# Create your views here.
class join_project_list(APIView):
    authentication_classes = [TokenAuthentication]
    def get(self, request):
        username = request.query_params.get('username') # username

        try :
            user = user_info.objects.get(username=username)
        except :
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)

        project_list = project.objects.filter(joiner=user.id)
        if len(project_list) == 0:
            return Response('아직 소속된 프로젝트가 없습니다.',status=status.HTTP_400_BAD_REQUEST)
        else :
            join_project = ProjectSerializer(project_list, many=True)
            return JsonResponse(join_project.data, safe=False)


class my_project_list(APIView):
    authentication_classes = [TokenAuthentication]
    def get(self, request):
        username = request.query_params.get('username') # username

        try :
            user = user_info.objects.get(username=username)
        except :
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)

        project_list = devoard.objects.filter(user_id=user)
        if len(project_list) == 0:
            return Response('아직 만든 프로젝트가 없습니다.',status=status.HTTP_400_BAD_REQUEST)
        else :
            join_project = MyDevoardSerializer(project_list, many=True, context={'request': request})
            return JsonResponse(join_project.data, safe=False)


class apply_project_list(APIView):
    authentication_classes = [TokenAuthentication]
    def get(self, request):
        username = request.query_params.get('username') # username

        try :
            user = user_info.objects.get(username=username)
        except :
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)

        project_list = project.objects.filter(team_master=user.id)
        if len(project_list) == 0:
            return Response('아직 만든 프로젝트가 없습니다.',status=status.HTTP_400_BAD_REQUEST)
        else :
            join_project = ApplyDevoardSerializer(project_list, many=True, context={'request': request})
            return JsonResponse(join_project.data, safe=False)


class project_detail(APIView):
    authentication_classes = [TokenAuthentication]
    def get(self, request):
        project_id = request.query_params.get('project_id') # project_id

        try :
            detail = devoard.objects.get(id=project_id)
        except :
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)

        join_project = devoardSerializer(detail)
        return JsonResponse(join_project.data, safe=False)
        
class access_awaiter(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        username = serializer.initial_data['username']              # 사용자 이름
        select_awaiter = serializer.initial_data['select_awaiter']  # 선택한 지원자 이름
        p_id = serializer.initial_data['p_id']                      # 프로젝트 고유 식별자 p_id
        print("username :",username)
        print("p_id :",p_id)
        print("select_awaiter :",select_awaiter)
        
        try :
            user = user_info.objects.get(username=username)
            select_awaiter = user_info.objects.get(username=select_awaiter)
        except :
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)

        try:
            now_project = project.objects.get(id = p_id ,team_master = user.id)
        except:
            return Response('존재하지 않는 프로젝트입니다.',status=status.HTTP_400_BAD_REQUEST)
        
        print("수락 전 참가자 :",now_project.joiner.all())
        now_project.joiner.add(select_awaiter)
        now_project.awaiter.remove(select_awaiter)
        print("수락 후 참가자 :",now_project.joiner.all())
        
        return Response('수락했습니다.',status=status.HTTP_200_OK)

        
class reject_awaiter(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        username = serializer.initial_data['username']              # 사용자 이름
        select_awaiter = serializer.initial_data['select_awaiter']  # 선택한 지원자 이름
        p_id = serializer.initial_data['p_id']                      # 프로젝트 고유 식별자 p_id
        print("username :",username)
        print("p_id :",p_id)
        print("select_awaiter :",select_awaiter)
        
        try :
            user = user_info.objects.get(username=username)
            select_awaiter = user_info.objects.get(username=select_awaiter)
        except :
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)

        try:
            now_project = project.objects.get(id = p_id ,team_master = user.id)
        except:
            return Response('존재하지 않는 프로젝트입니다.',status=status.HTTP_400_BAD_REQUEST)
        
        print("거절 전 지원자 :",now_project.awaiter.all())
        now_project.awaiter.remove(select_awaiter)
        print("거절 후 지원자 :",now_project.awaiter.all())
        
        return Response('거절했습니다.',status=status.HTTP_200_OK)
        


