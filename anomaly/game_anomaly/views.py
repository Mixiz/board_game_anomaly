from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse


# Create your views here.
#@login_required
def game(request):
    context = {
        'title': 'Board Games - Игра "Аномалия"',
    }

    return render(request, 'game_anomaly/game.html', context)


#@login_required
def start(request):
    context = {
        'title': 'Board Games - Игра "Аномалия"',
    }

    return render(request, 'game_anomaly/index.html', context)


#@login_required
def end(request):
    print(reverse('main'))
    return HttpResponseRedirect(reverse('main'))