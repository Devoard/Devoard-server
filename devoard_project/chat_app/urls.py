from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import chat_api, chat_detail
from django.views.generic import TemplateView
from user import views

urlpatterns = [
    path('list/', chat_api.as_view()),
    path('detail/', chat_detail.as_view()),
]