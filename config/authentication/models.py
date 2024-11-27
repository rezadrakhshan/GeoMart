from django.db import models
import uuid
from django.contrib.auth.models import User

# Create your models here.


from django.db import models
from django.contrib.auth.models import User
import uuid

class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile"
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=11)
    address = models.CharField(max_length=255)
    image = models.ImageField(upload_to="user/profile/")
    slug = models.UUIDField(primary_key=True, default=uuid.uuid4)


    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"

