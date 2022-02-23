from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import survey
from django.views.generic import TemplateView
from user import views

urlpatterns = [
    path('collect/', survey.as_view()), #post: 설문 끝
]