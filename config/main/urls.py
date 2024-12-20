from django.urls import path
from . import views


app_name = "main"

urlpatterns = [
    path("", views.home, name="home"),
    path("contact-us", views.contact_us, name="contact_us"),
    path("faq", views.faq, name="faq"),
    path("about-us", views.about_us, name="about_us"),
]
