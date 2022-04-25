from pipes import Template
from django.http import Http404
from django.shortcuts import render

from rest_framework.generics import get_object_or_404
from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from user.models import user_info
from .serializers import devoardSerializer
from .models import devoard
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
        #title= request.query_params.get('title')
        #body= request.query_params.get('body')
        #frontend_cnt= request.query_params.get('frontend_cnt')
        #backend_cnt= request.query_params.get('backend_cnt')
        #android_cnt= request.query_params.get('android_cnt')
        #ios_cnt= request.query_params.get('ios_cnt')
        #data_cnt= request.query_params.get('data_cnt')
        #devops_cnt= request.query_params.get('devops_cnt')
        #period= request.query_params.get('period')
        #done= request.query_params.get('done')
        #recruit_state= request.query_params.get('recruit_state')
        #field = request.query_params.get('field')
        try :
            writer_name = user_info.objects.get(username=writer)
        except :
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)

        devoard.objects.create(title=title, body= body, frontend_cnt = frontend_cnt, backend_cnt=backend_cnt, android_cnt= android_cnt,
        ios_cnt = ios_cnt, data_cnt=data_cnt, devops_cnt = devops_cnt, period = period, done=done, recruit_state= recruit_state, field = field, writer = writer_name, date=date) #저장
        return Response(status=status.HTTP_201_CREATED)
    
    def get(self, request): # 리스트 보여줄 때
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

    def get(self, reuqest, pk):
        devoard = self.get_object(pk)
        serializer = devoardSerializer(devoard)
        return Response(serializer.data)
    
    # def put(self, request, pk, format=None):
    #     devoard = self.get_object(pk)
    #     serializer = devoardSerializer(devoard, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def delete(self, request, pk, format=None):
    #     devoard = self.get_object(pk)
    #     devoard.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
