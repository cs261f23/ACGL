
from django.urls import path


from . import views

urlpatterns = [
    path('get_students_by_opportunity', views.get_students_by_opportunity,
         name='students_by_opportunity'),
    path('get_available_opportunities_for_student', views.get_available_opportunities_for_student,
         name='available_opportunities'),
    path('create_opportunity', views.create_opportunity, name='create_opportunity'),
    path('get_opportunities_by_partner_id',
         views.get_opportunities_by_partner_id, name='get_opportunities_by_partner_id'),
    path('attempt_login',
         views.attempt_login, name='attempt_login'),
    path('attempt_student_register',
         views.attempt_student_register, name='attempt_student_register'),
    path('attempt_partner_register',
         views.attempt_partner_register, name='attempt_partner_register'),

]
