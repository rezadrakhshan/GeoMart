from django.shortcuts import redirect
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist


class EnsureProfileMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.user.is_authenticated:
            return self.get_response(request)
        try:
            request.user.profile
        except ObjectDoesNotExist:
            allowed_paths = [
                reverse("authentication:profile"),
                reverse("authentication:login"),
                reverse("authentication:register"),
            ]
            if not any(request.path.startswith(path) for path in allowed_paths):
                return redirect("authentication:profile")
            print(f"User: {request.user}, Path: {request.path}")
            print(f"Allowed Paths: {allowed_paths}")
        return self.get_response(request)
    

