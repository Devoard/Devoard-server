from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import AlterSerializer,AlterDetailSerializer
from .models import alter
from project_app.models import project
from devoard_app.models import devoard
from user.models import user_info
from rest_framework.authentication import TokenAuthentication
# Create your views here.

class alterList(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        username = request.query_params.get('username')
        try :
            user = user_info.objects.get(username=username)
        except :
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)

        alter_list = alter.objects.filter(user = user.id)
        if len(alter_list)==0 :
            return Response('온 알람이 없습니다.',status=status.HTTP_400_BAD_REQUEST)
        else :
            alters = AlterSerializer(alter_list, many=True, context={'request': request})
            return JsonResponse(alters.data, safe=False)

class alterDetail(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        id = request.query_params.get('id')
        try :
            alter_title = alter.objects.get(id=id)
        except :
            return Response('ID 오류입니다.',status=status.HTTP_400_BAD_REQUEST)

        alter_detail = AlterDetailSerializer(alter_title, many=False, context={'request': request})

        return JsonResponse(alter_detail.data, safe=False)


        