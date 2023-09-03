
from django.urls import path


from . import views

urlpatterns = [
    path('get_students_by_opportunity', views.get_students_by_opportunity,
         name='students_by_opportunity'),

]
