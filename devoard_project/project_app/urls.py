from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('join_project/', views.join_project_list.as_view()),
    path('my_project/', views.my_project_list.as_view()),
    path('apply_project/', views.apply_project_list.as_view()),
    path('detail/', views.project_detail.as_view()),
    path('access_awaiter/', views.access_awaiter.as_view()),
]