# pyright: reportGeneralTypeIssues=false
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from .models import student, opportunity, opportunity_to_student, community_partner


def get_students_by_opportunity(request) -> HttpResponse:
    """
    returns all the students' information associated with a particular opportunity
    url = http://ip_address:port/portal/get_students_by_opportunity?id=1 (for example)
    """
    opportunity_id = request.GET.get('id')
    search = opportunity_to_student.objects.filter(
        opportunity_id=opportunity_id)
    ids = [i.student_id.dict() for i in list(search)]
    return JsonResponse(ids, headers={'Access-Control-Allow-Origin': '*'}, safe=False)


def get_available_opportunities_for_student(request) -> HttpResponse:
    """
    returns all the opportunities that are currently posted
    url = http://ip_address:port/portal/get_available_opportunities_for_student
    """
    opportunities = opportunity.objects.all()

    y = []
    for i in list(opportunities):
        partner = community_partner.objects.filter(
            partner_id=i.community_partner_id.partner_id)
        idict = i.dict()
        idict['community_partner_title'] = partner[0].partner_title
        idict.pop('community_partner_id')
        idict.pop('students')
        y.append(idict)
    return JsonResponse(y, headers={'Access-Control-Allow-Origin': '*'}, safe=False)


def get_opportunities_by_partner_id(request) -> HttpResponse:
    """
    returns all the opportunities that are associated with the given partner_id
    """
    ops = list(opportunity.objects.filter(
        community_partner_id=request.GET.get('id')))
    return JsonResponse([i.dict() for i in ops], headers={'Access-Control-Allow-Origin': '*'}, safe=False)


@csrf_exempt
def create_opportunity(request) -> HttpResponse | None:
    """
    creates an opportunity object and puts its attributes into the database
    """
    import json
    body_unicode = request.body.decode('utf-8')
    f = {}
    if (len(body_unicode) > 0):  # this line avoids an error from the options request that precedes the post request
        new_opportunity = json.loads(body_unicode)
        partner = community_partner.objects.filter(
            partner_title=new_opportunity['communityPartnerTitle'])[0]
        description = new_opportunity['description']
        keywords = new_opportunity['keywords']
        f = opportunity(description=description, keywords=keywords,
                        community_partner_id=partner)
        f.save()
    if (isinstance(f, opportunity)):
        f = f.dict()
    return JsonResponse(f, headers={'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'}, safe=False)
