from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import current_user, UserList
from django.views.generic import TemplateView
from user import views

urlpatterns = [
    path('user_info/', UserList.as_view()), #post는 회원가입, get은 조회
    path('current/', current_user),
    path('github/login/', views.github_login, name='github_login'),
    path('github/callback/', views.github_callback, name='github_callback'),
    path('github/login/finish/', views.GithubLogin.as_view(), name='github_login_todjango'),

]