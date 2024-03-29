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
from .pagination import SetPagination
from rest_framework.pagination import PageNumberPagination


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
        paginator = PageNumberPagination()
        paginator.page_size = 6
        recruit_state = request.query_params.get('recruit_state')
        if recruit_state:
            devoard_recruit = devoard.objects.filter(recruit_state=recruit_state)
            result_page = paginator.paginate_queryset(devoard_recruit, request)
            serializer = devoardSerializer(result_page, many=True)#여러개 객체 serialize하려면 many=True
            return paginator.get_paginated_response(serializer.data)
        else:  
            devoards = devoard.objects.all()
            result_page = paginator.paginate_queryset(devoards, request)
            serializer = devoardSerializer(result_page, many=True)#여러개 객체 serialize하려면 many=True
            return paginator.get_paginated_response(serializer.data)

class devoardDetail(APIView):
    authentication_classes = [TokenAuthentication]

    def get_object(self, pk):
        try:
            return devoard.objects.get(pk=pk)
        except devoard.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        devoard = self.get_object(pk)
        detail = project.objects.get(project_detail = pk)
        if request.user in detail.joiner.all():
            devoard.belong = True
            devoard.save()
        else :
            devoard.belong = False
            devoard.save()
        serializer = devoardSerializer(devoard)
        dd = serializer.data['field']
        print(dd)
        return Response(serializer.data)

    def put(self, request, pk):
        d = self.get_object(pk)
        serializer = devoardSerializer(d, data=request.data)

        d.title = serializer.initial_data['title']
        d.body = serializer.initial_data['body']
        d.frontend_cnt = serializer.initial_data['frontend_cnt']
        d.backend_cnt = serializer.initial_data['backend_cnt']
        d.android_cnt = serializer.initial_data['android_cnt']
        d.ios_cnt = serializer.initial_data['ios_cnt']
        d.data_cnt = serializer.initial_data['data_cnt']
        d.devops_cnt = serializer.initial_data['devops_cnt']
        d.period = serializer.initial_data['period']
        d.done = serializer.initial_data['done']
        d.recruit_state = serializer.initial_data['recruit_state']
        
        field = serializer.initial_data['field']
        field_data = ''
        if len(field) > 0:
            for data in field:
                field_data = data + ',' + field_data
            field_data = field_data[0:-1]
        else:
            field_data = field
        d.field = field_data
        d.save()
        return Response(status=status.HTTP_201_CREATED)

    def delete(self, request, pk, format=None):
        devoard = self.get_object(pk)
        devoard.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class devoardBtn(APIView):
    authentication_classes = [TokenAuthentication]

    def get_object(self, pk):
        try:
            return devoard.objects.get(pk=pk)
        except devoard.DoesNotExist:
            raise Http404

    def put(self, request, pk):
        d = self.get_object(pk)
        serializer = devoardSerializer(d, data=request.data)

        d.title = serializer.initial_data['title']
        d.body = serializer.initial_data['body']
        d.frontend_cnt = serializer.initial_data['frontend_cnt']
        d.backend_cnt = serializer.initial_data['backend_cnt']
        d.android_cnt = serializer.initial_data['android_cnt']
        d.ios_cnt = serializer.initial_data['ios_cnt']
        d.data_cnt = serializer.initial_data['data_cnt']
        d.devops_cnt = serializer.initial_data['devops_cnt']
        d.period = serializer.initial_data['period']
        d.field = serializer.initial_data['field']
        done = serializer.initial_data['done']
        recruit_state = serializer.initial_data['recruit_state']
       
        if recruit_state == False:
            done = "모집 완료"
        d.done = done
        d.recruit_state = recruit_state
        d.save()

        return Response(status=status.HTTP_201_CREATED)


class devoardNow(APIView):
    authentication_classes = [TokenAuthentication]

    def get_object(self, pk):
            try:
                return devoard.objects.get(pk=pk)
            except devoard.DoesNotExist:
                raise Http404

    def get(self, request):
        devoard_list = devoard.objects.order_by('-pk')[0:5]
        if len(devoard_list) == 0:
            return Response('아직 만들어진 프로젝트가 없습니다.',status=status.HTTP_400_BAD_REQUEST)
        else :
            list_project = devoardNowSerializer(devoard_list, many=True)
            return Response(list_project.data)