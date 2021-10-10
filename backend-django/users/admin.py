from django.contrib import admin
from .models import NewUser
from django.contrib.auth.admin import UserAdmin


class UserAdminConfig(UserAdmin):
    ordering = ("-start_date",)
    list_display = ("email", "name", "is_active", "is_staff")

    fieldsets = (
        (None, {"fields": ("email", "name")}),
        ('Permissions', {"fields": ("is_staff", "is_active")}),
    )
    add_fieldsets = (
        (None, {
            'classes': ("wide",),
            "fields": ("email", "name", "password1", "password2", "is_active", "is_staff")
        }),
    )

admin.site.register(NewUser, UserAdminConfig)