from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/move/(?P<room_name>\w+)/$", consumers.Moves.as_asgi())
]