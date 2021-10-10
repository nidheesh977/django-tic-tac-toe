from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        request = self.context.get("request")

        room = Room()
        room.player1 = validated_data["player1"]
        room.player2 = validated_data["player2"]

        room.save()

        return room

    class Meta:
        model = Room
        fields = "__all__"
