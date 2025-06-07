from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile, UserPrivacySetting,UserNotificationSetting

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    instance.profile.save()

@receiver(post_save, sender=User)
def create_privacy_setting(sender, instance, created, **kwargs):
    if created:
        UserPrivacySetting.objects.create(user=instance)

@receiver(post_save, sender=User)
def create_notification_setting(sender, instance, created, **kwargs):
    if created:
        UserNotificationSetting.objects.create(user=instance)