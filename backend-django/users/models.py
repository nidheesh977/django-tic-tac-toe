from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class CustomAccountManager(BaseUserManager):
    def create_user(self, email, name, password, **other_fields):
        if not email:
            raise ValueError(_("You must provide an email address"))
        if not password:
            raise ValueError(_("You must provide a password"))


        email = self.normalize_email(email)
        user = self.model(email = email, name = name, **other_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, name, password, **other_fields):
        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("is_superuser", True)
        other_fields.setdefault("is_active", True)

        if other_fields.get("is_staff") is not True:
            raise ValueError("Superuser must be assigned to is_staff = True.")
        if other_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must be assigned to is_superuser = True.")

        return self.create_user(email, name, password, **other_fields)

class NewUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique = True)
    name = models.CharField(max_length = 150, blank = True, null = True)
    start_date = models.DateTimeField(default = timezone.now)
    is_staff = models.BooleanField(default = False)
    is_active = models.BooleanField(default = False)

    objects = CustomAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.email