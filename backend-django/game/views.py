from django.shortcuts import render, redirect
from rest_framework import generics, permissions, views, response
from .models import Room
from .serializers import RoomSerializer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class CreatePlayer(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class GetMove(views.APIView):
    def post(self, request, format = None):
        move = request.data["move"]
        player = request.data["player"]
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)("game", {
            "type": "send_move",
            "move": move,
            "player": player
        })
        return response.Response("Success")