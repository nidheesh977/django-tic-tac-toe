from django.db import models
import uuid
from users.models import NewUser

# Create your models here.
class Room(models.Model):
    room_name = models.UUIDField(primary_key=False,default=uuid.uuid4, editable=False)
    player1 = models.ForeignKey(NewUser, on_delete = models.CASCADE, related_name = "player1", blank = True, null = True)
    player2 = models.ForeignKey(NewUser, on_delete = models.CASCADE, related_name = "player2", blank = True, null = True)

    class Meta:
        verbose_name_plural = 'Rooms'

    def __str__(self):
        return str(self.room_name)