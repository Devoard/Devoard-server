from django.db import models
from user.models import user_info

# Create your models here.
class project(models.Model):
    project_detail = models.ForeignKey("devoard_app.devoard", related_name="project_detail", on_delete=models.CASCADE,null=True) # 프로젝트 상세 내용
    team_master = models.ForeignKey("user.user_info", related_name="proejct_manager", on_delete=models.CASCADE,null=True) # 프로젝트 담당자
    joiner = models.ManyToManyField(user_info, related_name="project_joiner") # 프로젝트 참가자
    awaiter = models.ManyToManyField(user_info, related_name="project_awaiter") # 프로젝트 참가 대기자
    def __str__(self) -> str:
        return self.team_master.username