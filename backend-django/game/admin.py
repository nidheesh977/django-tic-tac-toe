from django.contrib import admin
from .models import Room

# Register your models here.

class RoomAdmin(admin.ModelAdmin):
    ordering = ("-id",)
    list_display = ("room_name", "player1", "player2")

admin.site.register(Room, RoomAdmin)