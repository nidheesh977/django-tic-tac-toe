import json
from channels.generic.websocket import AsyncWebsocketConsumer

class Moves(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']

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


    # Receive message from room group
    async def send_move(self, event):
        move = event['move']
        player = event["player"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'move': move,
            'player': player
        }))