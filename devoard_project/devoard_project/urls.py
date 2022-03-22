"""devoard_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from django.views.generic import TemplateView
from user import views
from rest_framework.urlpatterns import format_suffix_patterns
from devoard_app.views import devoardList, devoardDetail

urlpatterns = [
    path('user/',include('user.urls')),
    path('survey/',include('survey_app.urls')),
    path('chat/',include('chat_app.urls')),
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('login/', obtain_jwt_token), #토큰 발행 = 됨
    path('verify/', verify_jwt_token), #토큰 유효한지 검사 = 얘는 됨
    path('refresh/', refresh_jwt_token), #토큰 갱신 = 얘도 됨
    path('validate/', views.validate_jwt_token),
    #게시판
    path('devoard/', devoardList.as_view()),
    path('devoard/<int:pk>/', devoardDetail.as_view()),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)