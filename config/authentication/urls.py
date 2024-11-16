from django.urls import path
from .views import *


app_name = "authentication"

urlpatterns = [
    path("login/", login, name="login"),
    path("register/", register, name="register"),
    path("check-email/", check_email, name="check_email"),
    path("ajax_login/", ajax_login, name="ajax_login"),
]
