# pyright: reportGeneralTypeIssues=false
import os
import hashlib
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from .models import student, opportunity, opportunity_to_student, community_partner

post_headers = {'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'}
get_headers = {'Access-Control-Allow-Origin': '*'}
authorization_hashes: dict = {}


def get_students_by_opportunity(request: HttpRequest) -> HttpResponse:
    """
    returns all the students' information associated with a particular opportunity
    url = http://ip_address:port/portal/get_students_by_opportunity?id=1 (for example)
    """
    opportunity_id = request.GET.get('id')
    search = opportunity_to_student.objects.filter(
        opportunity_id=opportunity_id)
    ids = [i.student_id.dict() for i in list(search)]
    return JsonResponse(ids, headers=get_headers, safe=False)


def get_available_opportunities_for_student(request: HttpRequest) -> HttpResponse:
    """
    returns all the opportunities that are currently posted
    url = http://ip_address:port/portal/get_available_opportunities_for_student
    """
    opportunities = opportunity.objects.all()
    y = []
    for i in list(opportunities):
        idict = i.dict()
        idict['id'] = i.id
        try:
            _ = opportunity_to_student.objects.get(
                student_id=student.objects.get(student_id=authorization_hashes[str(request.GET.get('id'))].student_id), opportunity_id=i)

        except opportunity_to_student.DoesNotExist:
            y.append(idict)
    return JsonResponse(y, headers=get_headers, safe=False)


def get_opportunity_info(request: HttpRequest) -> HttpResponse:
    """
    gets opportunity info by id
    """
    try:
        op = opportunity.objects.get(id=request.GET.get('id'))
        return JsonResponse(op.dict(), headers=get_headers, safe=False)
    except opportunity.DoesNotExist:
        return JsonResponse("major error")


def get_opportunities_by_partner_id(request: HttpRequest) -> HttpResponse:
    """
    returns all the opportunities that are associated with the given partner_id
    url = http://ip_address:port/porta/get_opportunities_by_partner_id?id=1
    """
    ops = list(opportunity.objects.filter(
        community_partner_id=request.GET.get('id')))
    return JsonResponse([i.dict() for i in ops], headers=get_headers, safe=False)


def get_opportunities_by_student_id(request: HttpRequest) -> HttpResponse:
    ids = list(opportunity_to_student.objects.filter(
        student_id=authorization_hashes[request.GET.get('id')].student_id))

    print(ids)
    return JsonResponse([i.opportunity_id.dict() for i in ids], headers=get_headers, safe=False)


@ csrf_exempt
def create_opportunity(request: HttpRequest) -> HttpResponse:
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
        date = json_opportunity['date']
        date = date[:date.index('T')]
        new_opportunity = opportunity(description=description, keywords=keywords,
                                      community_partner_id=id, date=date)
        new_opportunity.save()
    if isinstance(new_opportunity, opportunity):
        new_opportunity = new_opportunity.dict()
    return JsonResponse(new_opportunity, headers=post_headers, safe=False)


@ csrf_exempt
def student_signup(request: HttpRequest) -> HttpResponse:
    import json
    body_unicode = request.body.decode('utf-8')
    # new_opportunity = {}
    if len(body_unicode) > 0:  # this line avoids an error from the options request that precedes the post request
        json_request = json.loads(body_unicode)
        try:
            student_check = student.objects.get(
                student_id=json_request['student_id'])
            opportunity_check = opportunity.objects.get(id=json_request['id'])
            new_op_to_stu = opportunity_to_student(
                opportunity_id=opportunity_check, student_id=student_check)
            new_op_to_stu.save()
            print(new_op_to_stu)
            return JsonResponse('success', headers=post_headers, safe=False)
        except student.DoesNotExist or opportunity.DoesNotExist:
            return JsonResponse('failure', headers=post_headers, safe=False)

    return JsonResponse({}, headers=post_headers, safe=False)


@csrf_exempt
def attempt_partner_register(request: HttpRequest) -> HttpResponse:
    """
    Checks validity of wannabe partner's info and creates partner
    """
    import json
    import hashlib
    import os
    body_unicode = request.body.decode('utf-8')
    if len(body_unicode) > 0:
        partner_json = json.loads(body_unicode)
        try:
            _ = community_partner.objects.get(
                partner_email=partner_json['email'])
            return JsonResponse("failed", headers=post_headers, safe=False)
        except community_partner.DoesNotExist:
            if '@' in partner_json['email']:
                salt = os.urandom(32)
                hashed_password = hashlib.pbkdf2_hmac(
                    'sha256', partner_json['password'].encode('utf-8'), salt, 100000)
                partner = community_partner(
                    partner_email=partner_json['email'],
                    partner_title=partner_json['title'],
                    password=hashed_password,
                    salt=salt
                )
                try:
                    partner.save()
                    return JsonResponse("success", headers=post_headers, safe=False)
                except:
                    return JsonResponse("failed", headers=post_headers, safe=False)
        return JsonResponse("failed", headers=post_headers, safe=False)
    return JsonResponse({}, headers=post_headers, safe=False)


@csrf_exempt
def attempt_student_register(request: HttpRequest) -> HttpResponse:
    """
    Checks validity of wannabe partner's info and creates partner
    """
    import json
    import hashlib
    import os
    body_unicode = request.body.decode('utf-8')
    if len(body_unicode) > 0:
        student_json = json.loads(body_unicode)
        try:
            _ = student.objects.get(
                student_email=student_json['email'])
            return JsonResponse("failed", headers=post_headers, safe=False)
        except student.DoesNotExist:
            if '@' in student_json['email']:
                salt = os.urandom(32)
                hashed_password = hashlib.pbkdf2_hmac(
                    'sha256', student_json['password'].encode('utf-8'), salt, 100000)
                stu = student(
                    student_email=student_json['email'],
                    name=student_json['name'],
                    salt=salt,
                    password=hashed_password,
                )
                stu.save(force_insert=True)
                return JsonResponse("success", headers=post_headers, safe=False)
        return JsonResponse("failed", headers=post_headers, safe=False)
    return JsonResponse({}, headers=post_headers, safe=False)


@csrf_exempt
def attempt_login(request: HttpRequest) -> HttpResponse:
    """
    Attempts to login by first checking for email/password in the partners table, then if there isn't a match there, it checks the student table
    """
    import json
    import hashlib
    body_unicode = request.body.decode('utf-8')
    if len(body_unicode) > 0:
        login = json.loads(body_unicode)
        try:
            partner_check = community_partner.objects.get(
                partner_email=login['email'])
            salt = partner_check.salt
            hashed_password = hashlib.pbkdf2_hmac(
                'sha256', login['password'].encode('utf-8'), salt, 100000)
            print(hashed_password)
            print(partner_check.password)
            if str(hashed_password) == str(partner_check.password):
                auth_hash = os.urandom(32)
                auth_hash = str(auth_hash)[2:]
                for i in '\\  \\|+!@#$%^&*()\'\"~`,/.;:{[]}x-=':
                    auth_hash.replace(i, '')
                # .replace('\'', '').replace('^', '').replace( '(', '').replace(')', '').replace('<', '').replace('>', '').replace('$', '').replace(' ', '')
                authorization_hashes[auth_hash] = partner_check
                return JsonResponse({'outcome': 'partner', 'id': partner_check.partner_id, 'hash': auth_hash}, headers=post_headers, safe=False)
            return JsonResponse({'outcome': 'failed'}, headers=post_headers, safe=False)
        except community_partner.DoesNotExist:
            try:
                student_check = student.objects.get(
                    student_email=login['email'])
                salt = student_check.salt
                hashed_password = hashlib.pbkdf2_hmac(
                    'sha256', login['password'].encode('utf-8'), salt, 100000)
                print(hashed_password)
                print(student_check.password)
                if str(hashed_password) == str(student_check.password):
                    auth_hash = os.urandom(32)
                    auth_hash = str(auth_hash)[2:]

                    for i in '\\  \\|+!@#$%^&*()\'\"~`,/.;:{[]}x-=':
                        auth_hash.replace(i, '')
                    authorization_hashes[auth_hash] = student_check
                    return JsonResponse({'outcome': 'student', 'id': student_check.student_id, 'hash': auth_hash}, headers=post_headers, safe=False)
                return JsonResponse({'outcome': 'failed'}, headers=post_headers, safe=False)
            except student.DoesNotExist:
                return JsonResponse({'outcome': 'failed'}, headers=post_headers, safe=False)
    else:
        return JsonResponse({}, headers=post_headers, safe=False)
