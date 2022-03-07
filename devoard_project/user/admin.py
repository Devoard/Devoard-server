from django.contrib import admin

# Register your models here.

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import AbstractUser
from .models import user_info, user_skill


admin.site.register(user_info)
admin.site.register(user_skill)