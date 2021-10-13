from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        request = self.context.get("request")
        print(request.user)
        room = Room()
        room.player1 = request.user
        room.player2 = request.user

        room.save()

        return room

    class Meta:
        model = Room
        fields = ""
