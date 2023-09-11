from django.contrib import admin

from .models import opportunity_to_student
from .models import opportunity
from .models import community_partner
from .models import student
# Register your models here.
admin.site.register(student)
admin.site.register(community_partner)
admin.site.register(opportunity_to_student)
admin.site.register(opportunity)
