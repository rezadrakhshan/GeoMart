from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User

# Create your views here.


def login(request):
    return render(request, "authentication/login.html")


def register(request):
    return render(request, "authentication/register.html")



def check_email(request):
    email = request.GET.get('email', None)
    response = {
        'exists': User.objects.filter(email=email).exists()
    }
    return JsonResponse(response)
