from pipes import Template
from django.shortcuts import render
from django.views.generic import TemplateView

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404

from .serializers import devoardSerializer
from .models import devoard
from rest_framework.authentication import TokenAuthentication

# Create your views here.
class AboutView(TemplateView):
    template_name = "index.html"

class devoardList(APIView): #목록 보여줌
    authentication_classes = [TokenAuthentication]
    def get(self, request): # 리스트 보여줄 때
        devoards = devoard.objects.all()

        serializer = devoardSerializer(devoards, many=True)#여러개 객체 serialize하려면 many=True
        return Response(serializer.data)

    def post(self, request): #새 글 작성 시
        serializer = devoardSerializer(
            data =request.data) #request.data는 사용자 입력 데이터
        if serializer.is_valid(): #유효성 검사
            serializer.save() #저장
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

class devoardDetail(APIView):
    def get_object(self, pk):
        try:
            return devoard.objects.get(pk=pk)
        except devoard.DoesNotExist:
            raise Http404

    def get(self, reuqest, pk, format=None):
        devoard = self.get_object(pk)
        serializer = devoardSerializer(devoard)
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

