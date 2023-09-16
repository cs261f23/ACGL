import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders
} from '@angular/common/http';
import { Opportunity } from './models/opportunity';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://127.0.0.1:8000/';
  }


  getStudentsByOpportunity(opportunityID: number): any {
    return this.http.get(this.url + '/portal/get_students_by_opportunity?id=' + opportunityID);
  }

  getAvailableOpportunitiesForStudent(): any {
    return this.http.get(this.url + '/portal/get_available_opportunities_for_student');
  }
  createOpportunity(opportunity: Opportunity) {
    let headers = new HttpHeaders()
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.post(this.url + 'portal/create_opportunity', opportunity, { headers: headers })
    // , { headers: headers })
  }

  getOpportunitiesByPartnerID(partnerID: number): any {
    return this.http.get(this.url + 'portal/get_opportunities_by_partner_id?id=' + partnerID)
  }
}
