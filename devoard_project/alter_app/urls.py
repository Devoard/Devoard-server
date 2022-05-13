from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('alter_list/', views.alterList.as_view()),
    path('detail/', views.alterDetail.as_view()),
]