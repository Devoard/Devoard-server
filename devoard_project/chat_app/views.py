from rest_framework.response import Response
from django.http.response import JsonResponse
from rest_framework.views import APIView
from user.models import user_info
from rest_framework import status
from .models import chat
from chat_app.serializers import ChatSerializer,ChatListSerializer
from rest_framework.authentication import TokenAuthentication
from django.db.models import Q
from itertools import chain
import datetime

class chat_api(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):
        serializer = ChatSerializer(data=request.data)

        sender = serializer.initial_data['from_user'] # 보내는 사람
        print('sender :',sender)
        receiver = serializer.initial_data['to_user'] # 받는 사람
        print('receiver :',receiver)
        chat_body = serializer.initial_data['content'] # 내용
        print('chat_body :',chat_body)
        time_stamp = serializer.initial_data['date'] # 보낸 시간
        print('time_stamp :',time_stamp)
        format = '%Y-%m-%d %H:%M'
        dt_datetime = datetime.datetime.strptime(time_stamp,format)

        try :
            sender_user = user_info.objects.get(username=sender)
            receiver_user = user_info.objects.get(username=receiver)
        except :
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)

        chat.objects.create(sender=sender_user, receiver=receiver_user, chat_body=chat_body,time_stamp=dt_datetime)

        return Response('쪽지 전송 성공.',status=status.HTTP_201_CREATED)
    
    def get(self, request):
        sender = request.query_params.get('user') # 보내는 사람
        receiver = request.query_params.get('user') # 보내는 사람
        print('list sender: ',sender)
        try :
            sender_user = user_info.objects.get(username=sender)
            receiver_user = user_info.objects.get(username=receiver)
        except :
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)


        chats = chat.objects.filter(Q(sender=sender_user.id) | Q(receiver=receiver_user.id))
        all_user = user_info.objects.exclude(username=sender)
        all_user_chat = [None]
        for user in all_user:
            user_chat = chats.filter(Q(sender=user.id) | Q(receiver=user.id)).last()
            if user_chat is None:
                continue
            else :
                if all_user_chat[0] is None:
                    all_user_chat[0] = user_chat
                else :
                    all_user_chat.append(user_chat)

        if len(chats) == 0:
            return Response('나눈 대화가 없습니다.',status=status.HTTP_400_BAD_REQUEST)
        else :
            chat_list = ChatListSerializer(all_user_chat, many=True, context={'request': request})
            for chat_detail in range(len(chat_list.data)):
                if chat_list.data[chat_detail]['sender'] == sender:
                    del chat_list.data[chat_detail]['sender']
                elif chat_list.data[chat_detail]['receiver'] == receiver:
                    del chat_list.data[chat_detail]['receiver']
                else :
                    continue
                print('data [',chat_detail,'] :',chat_list.data[chat_detail])
            return JsonResponse(chat_list.data, safe=False)

class chat_detail(APIView):
    authentication_classes = [TokenAuthentication]
    def get(self, request):
        
        sender = request.query_params.get('from_user') # 보내는 사람
        receiver = request.query_params.get('to_user') # 받는 사람
        print('detail sender: ',sender)
        print('detail receiver: ',receiver)
        try :
            sender_user = user_info.objects.get(username=sender)
            receiver_user = user_info.objects.get(username=receiver)
        except :
            return Response('등록되지 않은 사용자입니다.',status=status.HTTP_400_BAD_REQUEST)

        chats = chat.objects.filter((Q(receiver=receiver_user.id)& Q(sender=sender_user.id)|(Q(receiver=sender_user.id)& Q(sender=receiver_user.id))))
        for last_chat in chats :
            if last_chat.read == False:
                last_chat.read = True
                last_chat.save()
            else:
                continue

        if len(chats) == 0:
            return Response('나눈 대화가 없습니다.',status=status.HTTP_400_BAD_REQUEST)
        else :
            chat_list = ChatListSerializer(chats, many=True, context={'request': request})
            for chat_detail in range(len(chat_list.data)):
                if chat_list.data[chat_detail]['sender'] == sender:
                    del chat_list.data[chat_detail]['sender']
                elif chat_list.data[chat_detail]['receiver'] == sender:
                    del chat_list.data[chat_detail]['receiver']
                else :
                    continue
            return JsonResponse(chat_list.data, safe=False)


        


