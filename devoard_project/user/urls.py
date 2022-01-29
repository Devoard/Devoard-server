from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import current_user, UserList
from django.views.generic import TemplateView

urlpatterns = [
    path('user_info/', UserList.as_view()), #post는 회원가입, get은 조회
    path('current/', current_user),
]  + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)