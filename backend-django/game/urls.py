from django.urls import path 
from . import views

urlpatterns = [
    path("", views.CreatePlayer.as_view(), name = "create_user"),
    path("move/", views.GetMove.as_view(), name = "get_move"),
]