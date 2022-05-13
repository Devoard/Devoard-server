from django.db import models

# Create your models here.
class alter(models.Model):
    user = models.ForeignKey("user.user_info", related_name="info", on_delete=models.CASCADE,null=True)
    devoard_data = models.ForeignKey("devoard_app.devoard", related_name="devoard_data", on_delete=models.CASCADE,null=True) # 프로젝트 상세 내용
    project_data = models.ForeignKey("project_app.project", related_name="project_data", on_delete=models.CASCADE,null=True) # 프로젝트 상세 내용
    team_master = models.ForeignKey("user.user_info", related_name="team_master", on_delete=models.CASCADE,null=True) # 프로젝트 담당자
    title = models.TextField(default='')
    data = models.TextField(default='')
    def __str__(self) -> str:
        return str(self.user.username) + ' 가 지원한 ' + str(self.devoard_data.title) 