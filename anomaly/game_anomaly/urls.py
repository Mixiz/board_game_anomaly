from django.urls import path

import game_anomaly.views as game_anomaly

app_name = 'game_anomaly'

urlpatterns = [
    path('game/', game_anomaly.game, name='game'),
    path('start/', game_anomaly.start, name='start'),
    path('end/', game_anomaly.end, name='end'),
]