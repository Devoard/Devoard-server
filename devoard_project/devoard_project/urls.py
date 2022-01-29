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
import rest_framework_jwt.views as rv
from django.views.generic import TemplateView
from user import views

urlpatterns = [
    path('user/',include('user.urls')),
    path('admin/', admin.site.urls),
    path('main/', TemplateView.as_view(template_name='index.html')),
    path('login/', rv.obtain_jwt_token), #토큰 발행
    path('verify/', rv.verify_jwt_token), #토큰 유효한지 검사
    path('refresh/', rv.refresh_jwt_token), #토큰 갱신
    path('validate/', views.validate_jwt_token),


] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
