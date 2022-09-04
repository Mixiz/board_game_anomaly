from django.shortcuts import render
from django.urls import resolve


# Menu items #
header_menu = [
    {'href': 'main', 'name': 'На главную'},
    {'href': 'games', 'name': 'игры'},
    {'href': 'contacts', 'name': 'контакты'},
    {'href': 'authapp:edit', 'name': 'пользователь', 'need_auth': True},
]


# Create your views here.
def main(request):
    context = {
        'title': 'Board Games - главная',
        'header_menu': header_menu,
    }

    return render(request, 'mainapp/index.html', context)


def contacts(request):
    context = {
        'title': 'Board Games - главная',
        'header_menu': header_menu,
    }

    return render(request, 'mainapp/contacts.html', context)


def rules(request):
    context = {
        'title': 'Board Games - главная',
        'header_menu': header_menu,
    }

    return render(request, 'mainapp/rules.html', context)


def games(request):
    context = {
        'title': 'Board Games - главная',
        'header_menu': header_menu,
    }

    return render(request, 'mainapp/games.html', context)