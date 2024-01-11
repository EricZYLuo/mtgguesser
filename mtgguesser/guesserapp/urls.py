from django.contrib import admin
from django.urls import path, re_path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("home", views.homeView.as_view(), name="home"),
    re_path(r'^api/accounts/$', views.accounts_list),
    re_path(r'^api/accounts/([0-9])$', views.accounts_detail),
]