from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from .models import student, job_opportunity, opportunity_to_student, community_partner


def get_students_by_opportunity(request) -> HttpResponse:
    """
    returns all the student ids associated with a particular opportunity
    """
    opportunity_id = request.GET.get('id')
    search = opportunity_to_student.objects.filter(
        opportunity_id=opportunity_id)
    ids = [i.student_id.dict() for i in list(search)]
    return JsonResponse(ids, headers={'Access-Control-Allow-Origin': '*'}, safe=False)


# Create your views here.
