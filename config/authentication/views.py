from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib import auth

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
        auth.login(request, user_object)
        return redirect("main:home")

    return render(request, "authentication/register.html")


def check_email(request):
    email = request.GET.get("email", None)
    response = {"exists": User.objects.filter(email=email).exists()}
    return JsonResponse(response)
