from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import register, login, register_form, game_para, game_test

urlpatterns = [
    path('api/register/', register, name='register'),
    path('api/token/', obtain_auth_token, name='token'),
    path('api/login/', login, name='login'),
    path('utility/register_form/', register_form, name='register_form'),
    # path('utility/course_rec/', course_rec, name='course_rec'),
    path('game/para/', game_para, name='game_para'),
    path('game/test/', game_test, name='game_test')
]