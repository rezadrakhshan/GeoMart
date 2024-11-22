from django.urls import path
from .views import *


app_name = "authentication"

urlpatterns = [
    path("login/", login, name="login"),
    path("register/", register, name="register"),
    path("check-email/", check_email, name="check_email"),
    path("check-username/", check_username, name="check_username"),
    path("ajax_login/", ajax_login, name="ajax_login"),
    path("send_code/", send_code, name="send_code"),
]
