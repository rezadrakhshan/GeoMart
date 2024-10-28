from django.db import models
from django.contrib.auth.models import User
import uuid
from ckeditor_uploader.fields import RichTextUploadingField
from django_jsonform.models.fields import ArrayField
from extensions.utils import jalali_converter

# Create your models here.


class Blog(models.Model):
    slug = models.UUIDField(primary_key=True, default=uuid.uuid4)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    banner = models.ImageField(upload_to="blogs/")
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=200)
    detail = RichTextUploadingField()
    date = models.DateField(auto_now_add=True)
    is_published = models.BooleanField(default=False)
    num_of_likes = models.IntegerField(default=0)
    tags = ArrayField(models.CharField(max_length=10, blank=True), size=8)

    def jpublish(self):
        return jalali_converter(self.date)
