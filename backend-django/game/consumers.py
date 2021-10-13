import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Room

class Moves(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]

        # Join room group
        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        move = text_data_json['move']
        player = text_data_json['player']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': 'send_move',
                'move': move,
                'player': player
            }
        )

    # Receive message from room group
    async def send_move(self, event):
        move = event['move']
        player = event["player"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'move': move,
            'player': player
        }))