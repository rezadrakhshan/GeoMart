from django.shortcuts import render, redirect
from blog.models import Blog
from django.contrib import messages
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from config.settings import EMAIL_HOST_USER

# Create your views here.


def home(request):
    blog = Blog.objects.filter(is_published=True)[:3]
    context = {"blogs": blog}
    return render(request, "index.html", context)


def contact_us(request):
    if request.method == "POST":
        name = request.POST.get("name")
        user_email = request.POST.get("email")
        subject = request.POST.get("subject")
        message = request.POST.get("message")
        html_content = render_to_string(
            "email/contact_email.html",
            {"name": name, "email": user_email, "subject": subject, "message": message},
        )
        text_content = strip_tags(html_content)
        email = EmailMultiAlternatives(
            subject, text_content, EMAIL_HOST_USER, [EMAIL_HOST_USER]
        )
        email.attach_alternative(html_content, "text/html")
        email.send()
        html_content = render_to_string("email/contact_user_message.html")
        text_content = strip_tags(html_content)
        email2 = EmailMultiAlternatives(
            "پیام شما دریافت شد - از ارتباط شما سپاسگزاریم!",
            text_content,
            EMAIL_HOST_USER,
            [user_email],
        )
        email2.attach_alternative(html_content, "text/html")
        email2.send()
        return render(request, "email/mail-success.html")
    return render(request, "contact-us.html")


def faq(request):
    return render(request, "faq.html")


def about_us(request):
    return render(request, "about.html")
