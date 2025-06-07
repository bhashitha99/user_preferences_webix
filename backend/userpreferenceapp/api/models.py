# Create your models here.
# models.py

from django.db import models

class User(models.Model):
    userid = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=20)
    username = models.CharField(max_length=40, unique=True)
    password = models.CharField(max_length=50)

    # Optional fields
    phone = models.CharField(max_length=15, blank=True, null=True)
    maritalstatus = models.CharField(max_length=10, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    job = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=20, blank=True, null=True)
    country = models.CharField(max_length=20, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)


class NotificationSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, to_field='username')

    meetingReminders = models.BooleanField()
    timesheetReminders = models.BooleanField()
    projectUpdates = models.BooleanField()
    teamMentions = models.BooleanField()
    reaveRequestStatus = models.BooleanField()  # typo in "reave"?
    taskAssignments = models.BooleanField()
    announcementUpdates = models.BooleanField()
    emailAlerts = models.BooleanField()
    smsAlerts = models.BooleanField()
    pushNotifications = models.BooleanField()
    browserNotifications = models.BooleanField()
    desktopNotifications = models.BooleanField()
    notificationSound = models.CharField(max_length=20)
    notificationVolume = models.IntegerField()
    enableSoundAlerts = models.BooleanField()
    dndMode = models.BooleanField()
    dndFrom = models.TimeField()
    dndTo = models.TimeField()

class PrivacySettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, to_field='username')

    profileVisibility = models.CharField(max_length=20)
    profilePictureVisibility = models.CharField(max_length=20)
    contactVisibility = models.CharField(max_length=20)
    requestConnection = models.CharField(max_length=20)
    followConnection = models.CharField(max_length=20)
    suggestionsConnection = models.CharField(max_length=20)
    messagePermission = models.CharField(max_length=20)
    mentionPermission = models.CharField(max_length=20)
    lastSeenData = models.CharField(max_length=20)
    discoverableData = models.BooleanField()
    activeStatusData = models.BooleanField()
