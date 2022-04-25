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

        project_list = project.objects.filter(awaiter=user.id)
        if len(project_list) == 0:
            return Response('아직 지원한 프로젝트가 없습니다.',status=status.HTTP_400_BAD_REQUEST)
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
        


