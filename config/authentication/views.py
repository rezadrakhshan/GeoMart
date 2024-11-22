from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib import auth
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from config.settings import EMAIL_HOST_USER
from random import randint

# Create your views here.


def login(request):

    return render(request, "authentication/login.html")


def register(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        password = request.POST.get("password")
        user_object = User.objects.create(
            username=name, email=email, password=make_password(password)
        )
        user_object.save()
        auth.login(
            request, user_object, backend="django.contrib.auth.backends.ModelBackend"
        )
        return redirect("main:home")

    return render(request, "authentication/register.html")


def check_email(request):
    email = request.GET.get("email", None)
    response = {"exists": User.objects.filter(email=email).exists()}
    return JsonResponse(response)


def check_username(request):
    username = request.GET.get("username", None)
    response = {"exists": User.objects.filter(username=username).exists()}
    return JsonResponse(response)


def ajax_login(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        user = auth.authenticate(request, email=email, password=password)
        if user is not None:
            auth.login(request, user)
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False, "error": "Invalid credentials"})
    return JsonResponse({"success": False, "error": "Only POST method is allowed"})


def send_code(request):
    email = request.GET.get("email", None)
    code = randint(1000,9999)
    html_content = render_to_string("email/authentication_code.html", {"code": code})
    text_content = strip_tags(html_content)
    email2 = EmailMultiAlternatives(
        "کد ورود",
        text_content,
        EMAIL_HOST_USER,
        [email],
    )
    email2.attach_alternative(html_content, "text/html")
    email2.send()
    return JsonResponse({"code": code})
