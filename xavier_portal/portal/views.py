# pyright: reportGeneralTypeIssues=false
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse

from .models import student, opportunity, opportunity_to_student, community_partner
post_headers = {'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'}
get_headers = {'Access-Control-Allow-Origin': '*'}


def get_students_by_opportunity(request) -> HttpResponse:
    """
    returns all the students' information associated with a particular opportunity
    url = http://ip_address:port/portal/get_students_by_opportunity?id=1 (for example)
    """
    opportunity_id = request.GET.get('id')
    search = opportunity_to_student.objects.filter(
        opportunity_id=opportunity_id)
    ids = [i.student_id.dict() for i in list(search)]
    return JsonResponse(ids, headers=get_headers, safe=False)


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
        y.append(idict)
    return JsonResponse(y, headers=get_headers, safe=False)


def get_opportunities_by_partner_id(request) -> HttpResponse:
    """
    returns all the opportunities that are associated with the given partner_id
    url = http://ip_address:port/porta/get_opportunities_by_partner_id?id=1
    """
    ops = list(opportunity.objects.filter(
        community_partner_id=request.GET.get('id')))
    return JsonResponse([i.dict() for i in ops], headers=get_headers, safe=False)


@csrf_exempt
def create_opportunity(request) -> HttpResponse:
    """
    creates an opportunity object and puts its attributes into the database
    """
    import json
    body_unicode = request.body.decode('utf-8')
    new_opportunity = {}
    if len(body_unicode) > 0:  # this line avoids an error from the options request that precedes the post request
        json_opportunity = json.loads(body_unicode)
        id = community_partner.objects.filter(
            partner_id=json_opportunity['id'])[0]
        description = json_opportunity['description']
        keywords = json_opportunity['keywords']
        new_opportunity = opportunity(description=description, keywords=keywords,
                                      community_partner_id=id)
        new_opportunity.save()
    if isinstance(new_opportunity, opportunity):
        new_opportunity = new_opportunity.dict()
    return JsonResponse(new_opportunity, headers=post_headers, safe=False)




@csrf_exempt
def attempt_login(request) -> HttpResponse:
    import json
    import hashlib
    body_unicode = request.body.decode('utf-8')
    if len(body_unicode) > 0:
        hash = hashlib.new('sha256')
        login = json.loads(body_unicode)
        hash.update(bytes(login['password'], encoding='utf-8'))
        partner_check = community_partner.objects.filter(
            password=hash.hexdigest(), partner_email=login['email'])
        if len(list(partner_check)) == 1:
            return JsonResponse({'outcome': 'partner', 'id': list(partner_check)[0].partner_id}, headers=post_headers)
        else:
            student_check = student.objects.filter(
                password=hash.hexdigest(), student_email=login['email'])
            if len(list(student_check)) == 1:
                return JsonResponse({'outcome': 'student'}, headers=post_headers)
        return JsonResponse({'outcome': 'failed'}, headers=post_headers)
    else:
        return JsonResponse({}, headers=post_headers)
