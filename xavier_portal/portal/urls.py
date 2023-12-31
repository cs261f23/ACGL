
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
    path('get_opportunity_info', views.get_opportunity_info,
         name='get_opportunity_info'),
    path('attempt_student_signup', views.student_signup,
         name='attempt_student_signup'),
    path('attempt_student_unsignup', views.student_unsignup,
         name='attempt_student_unsignup'),
    path('get_opportunities_by_student_id', views.get_opportunities_by_student_id,
         name='get_opportunities_by_student_id'),
    path('edit_opportunity', views.edit_opportunity,
         name='views.edit_opportunity'),
    path('delete_opportunity', views.delete_opportunity,
         name='views.delete_opportunity'),
    path('logout', views.logout, name='views.logout')
]
