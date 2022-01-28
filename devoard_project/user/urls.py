from django.urls import path
from .views import current_user, UserList

urlpatterns = [
    path('user_info/', UserList.as_view()),
    path('current/', current_user),
] 