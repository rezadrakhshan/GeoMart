from django.shortcuts import render
from blog.models import Blog
# Create your views here.



def home(request):
    blog = Blog.objects.all()
    context = {
        "blogs":blog
    }
    return render(request, 'index.html',context)