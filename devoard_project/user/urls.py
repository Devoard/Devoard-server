from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import current_user, UserList

urlpatterns = [
    path('user_info/', UserList.as_view()),
    path('current/', current_user),
]  + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)