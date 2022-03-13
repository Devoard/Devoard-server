from rest_framework.response import Response
from django.http.response import JsonResponse
from rest_framework.views import APIView
from user.models import user_info
from rest_framework import status
from .models import chat
from chat_app.serializers import ChatSerializer,ChatListSerializer
from rest_framework.authentication import TokenAuthentication
from django.db.models import Q

class chat_api(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):
        serializer = ChatSerializer(data=request.data)

        sender = serializer.initial_data['from_user'] # 보내는 사람
        receiver = serializer.initial_data['to_user'] # 받는 사람
        chat_body = serializer.initial_data['content'] # 내용
        time_stamp = serializer.initial_data['date'] # 보낸 시간
        print(time_stamp)

        try :
            sender_user = user_info.objects.get(username=sender)
            receiver_user = user_info.objects.get(username=receiver)
        except :
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)

        chat.objects.create(sender=sender_user, receiver=receiver_user, chat_body=chat_body,time_stamp=time_stamp)

        return Response('쪽지 전송 성공.',status=status.HTTP_201_CREATED)
    
    def get(self, request):
        serializer = ChatSerializer(data=request.data)
        sender = serializer.initial_data['from_user'] # 보내는 사람
        receiver = serializer.initial_data['to_user'] # 받는 사람

        try :
            sender_user = user_info.objects.get(username=sender)
            receiver_user = user_info.objects.get(username=receiver)
        except :
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)


        chats = chat.objects.filter(Q(receiver=receiver_user.id)& Q(sender=sender_user.id))
        if len(chats) == 0:
            return Response('나눈 대화가 없습니다.',status=status.HTTP_400_BAD_REQUEST)
        else :
            chat_list = ChatListSerializer(chats, many=True, context={'request': request})
            return JsonResponse(chat_list.data, safe=False)

    

        


