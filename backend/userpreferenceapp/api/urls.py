from django.urls import path
from .views import UserListCreateAPIView,RegisterUserView

urlpatterns = [
    path('users/', UserListCreateAPIView.as_view(), name='user-list-create'),
    path('register/', RegisterUserView.as_view(), name='register'),
]