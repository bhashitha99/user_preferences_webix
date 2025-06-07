from django.urls import path
from .views import LoginView,RegisterView,UserProfileView,ChangePasswordView,UserNotificationSettingView,UserPrivacySettingView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('notification-settings/', UserNotificationSettingView.as_view(), name='notification-settings'),
    path('privacy-settings/', UserPrivacySettingView.as_view(), name='privacy-settings'),
]
