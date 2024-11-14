from django.urls import path
from .views import *


app_name = "authentication"

urlpatterns = [
    path("login/",login,name="login"),
    path("register/",register,name="register"),
]
