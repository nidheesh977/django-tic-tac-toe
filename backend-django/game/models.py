from django.db import models
import uuid

class Room(models.Model):
    room_name = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    waiting_for_player = models.BooleanField(default = True)

    def __str__(self):
        return self.room_name