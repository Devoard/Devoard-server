from django.db import models
from user.models import user_info
import datetime

# Create your models here.
class chat(models.Model):
    sender = models.ForeignKey("user.user_info", related_name="user_chat_from", on_delete=models.CASCADE,null=True)
    receiver = models.ForeignKey("user.user_info", related_name="user_chat_to", on_delete=models.CASCADE,null=True)
    chat_body = models.TextField(default='')
    time_stamp = models.DateTimeField(blank=True)

    def __str__(self):
        return self.chat_body[0:10]
