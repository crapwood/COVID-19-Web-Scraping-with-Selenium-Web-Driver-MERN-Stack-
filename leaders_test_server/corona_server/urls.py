from django.urls import path
from . import views

app_name = 'corona_server'
urlpatterns = [
    path('covid/', views.getInfo, name='info'),
]