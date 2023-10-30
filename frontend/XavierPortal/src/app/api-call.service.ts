import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders
} from '@angular/common/http';
import { Opportunity } from './models/opportunity';
import { Observable } from 'rxjs';
import { Binary } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  url: string;
  headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })

  constructor(private http: HttpClient) {
    this.url = 'http://127.0.0.1:8000/';
  }


  getStudentsByOpportunity(opportunityID: number): any {
    return this.http.get(this.url + '/portal/get_students_by_opportunity?id=' + opportunityID);
  }

  getAvailableOpportunitiesForStudent(): any {
    return this.http.get(this.url + '/portal/get_available_opportunities_for_student');
  }
  getOpportunityInfo(id: number) {
    return this.http.get(this.url + 'portal/get_opportunity_info?id=' + id);
  }

  getOpportunitiesByPartnerID(partnerID: number): any {
    // let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.get(this.url + 'portal/get_opportunities_by_partner_id?id=' + partnerID)
  }

  attemptLogin(email: string, password: string) {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/attempt_login', { email: email, password: password }, headers = headers)
  }
  createOpportunity(opportunity: Opportunity) {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/create_opportunity', opportunity, headers = headers)
  }

  studentRegister(email: string, name: string, password: string): Observable<any> {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/attempt_student_register', { email: email, name: name, password: password }, headers = headers)
  }
  partnerRegister(email: string, title: string, password: string): Observable<any> {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/attempt_partner_register', { email: email, title: title, password: password }, headers = headers)
  }

  signUpForOpportunity(object: {}, id: number) {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/route you made in backend', object, headers = headers)
  }
}
