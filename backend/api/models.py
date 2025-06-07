
from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone = models.CharField(max_length=15, blank=True, null=True)
    maritalstatus = models.CharField(max_length=10, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    job = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=20, blank=True, null=True)
    country = models.CharField(max_length=20, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.user.username

class UserNotificationSetting(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='notification_settings')

    meetingReminders = models.BooleanField(default=True)
    timesheetReminders = models.BooleanField(default=True)
    projectUpdates = models.BooleanField(default=True)
    teamMentions = models.BooleanField(default=True)
    reaveRequestStatus = models.BooleanField(default=True)
    taskAssignments = models.BooleanField(default=True)
    announcementUpdates = models.BooleanField(default=True)
    emailAlerts = models.BooleanField(default=True)
    smsAlerts = models.BooleanField(default=False)
    pushNotifications = models.BooleanField(default=True)
    browserNotifications = models.BooleanField(default=True)
    desktopNotifications = models.BooleanField(default=False)
    notificationSound = models.CharField(max_length=20, default="chime")
    notificationVolume = models.IntegerField(default=50)
    enableSoundAlerts = models.BooleanField(default=True)
    dndMode = models.BooleanField(default=False)
    dndFrom = models.TimeField(null=True, blank=True)
    dndTo = models.TimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.email}'s Notification Settings"
    
class UserPrivacySetting(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="privacy_setting")

    profileVisibility = models.CharField(max_length=20, default="everyone")  # options: everyone, friends, only_me
    profilePictureVisibility = models.CharField(max_length=20, default="everyone")
    contactVisibility = models.CharField(max_length=20, default="friends")
    requestConnection = models.CharField(max_length=20, default="everyone")
    followConnection = models.CharField(max_length=20, default="everyone")
    suggestionsConnection = models.CharField(max_length=20, default="enabled")
    messagePermission = models.CharField(max_length=20, default="friends")
    mentionPermission = models.CharField(max_length=20, default="everyone")
    lastSeenData = models.CharField(max_length=20, default="friends")
    discoverableData = models.BooleanField(default=True)
    activeStatusData = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username} Privacy Settings"