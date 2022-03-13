from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import chat_api
from django.views.generic import TemplateView
from user import views

urlpatterns = [
    path('collect/', chat_api.as_view()),
]