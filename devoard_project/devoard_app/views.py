from pipes import Template
from django.http import Http404
from django.shortcuts import render

from rest_framework.generics import get_object_or_404
from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from user.models import user_info
from .serializers import devoardSerializer, devoardNowSerializer
from .models import devoard
from project_app.models import project
from rest_framework.authentication import TokenAuthentication

# Create your views here.
class AboutView(TemplateView):
    template_name = "index.html"

class devoardList(APIView): #목록 보여줌
    authentication_classes = [TokenAuthentication]

    def post(self, request): #새 글 작성 시
        serializer = devoardSerializer(data=request.data)
        title = serializer.initial_data['title']
        body = serializer.initial_data['body']
        frontend_cnt = serializer.initial_data['frontend_cnt']
        backend_cnt = serializer.initial_data['backend_cnt']
        android_cnt = serializer.initial_data['android_cnt']
        ios_cnt = serializer.initial_data['ios_cnt']
        data_cnt = serializer.initial_data['data_cnt']
        devops_cnt = serializer.initial_data['devops_cnt']
        period = serializer.initial_data['period']
        done = serializer.initial_data['done']
        recruit_state = serializer.initial_data['recruit_state']
        field = serializer.initial_data['field']
        writer = serializer.initial_data['username']
        date = serializer.initial_data['date']

        field_data = ''
        if len(field) > 0:
            for data in field:
                field_data = data + ',' + field_data
            field_data = field_data[0:-1]
        else:
            field_data = field

        try :
            writer_name = user_info.objects.get(username=writer)
        except :
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)

        new_devoard = devoard.objects.create(title=title, body= body, frontend_cnt = frontend_cnt, backend_cnt=backend_cnt, android_cnt= android_cnt,
        ios_cnt = ios_cnt, data_cnt=data_cnt, devops_cnt = devops_cnt, period = period, done=done, recruit_state= recruit_state, field = field_data, writer = writer_name, date=date) #저장
        
        new_project = project.objects.create(project_detail=new_devoard, team_master = writer_name)
        new_project.joiner.add(writer_name)

        return Response(status=status.HTTP_201_CREATED)
    
    def get(self, request): # 리스트 보여줄 때
        recruit_state = request.query_params.get('recruit_state')
        if recruit_state:
            devoard_recruit = devoard.objects.filter(recruit_state=recruit_state)
            serializer = devoardSerializer(devoard_recruit, many=True)#여러개 객체 serialize하려면 many=True
            return Response(serializer.data)
        else: 
            devoards = devoard.objects.all()
            serializer = devoardSerializer(devoards, many=True)#여러개 객체 serialize하려면 many=True
            return Response(serializer.data)

class devoardDetail(APIView):
    authentication_classes = [TokenAuthentication]

    def get_object(self, pk):
        try:
            return devoard.objects.get(pk=pk)
        except devoard.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        devoard = self.get_object(pk)
        serializer = devoardSerializer(devoard)
        dd = serializer.data['field']
        print(dd)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        devoard = self.get_object(pk)
        serializer = devoardSerializer(devoard, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        devoard = self.get_object(pk)
        devoard.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class devoardNow(APIView):
    authentication_classes = [TokenAuthentication]
    def get(self, request):
        devoard_list = devoard.objects.order_by('-pk')[0:5]
        if len(devoard_list) == 0:
            return Response('아직 만들어진 프로젝트가 없습니다.',status=status.HTTP_400_BAD_REQUEST)
        else :
            list_project = devoardNowSerializer(devoard_list, many=True)
            return Response(list_project.data)