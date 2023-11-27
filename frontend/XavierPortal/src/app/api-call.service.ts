import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams
} from '@angular/common/http';
import { Opportunity } from './models/opportunity';
import { Observable } from 'rxjs';
import { Binary } from '@angular/compiler';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  url: string;
  headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = 'http://127.0.0.1:8000/';
    // this.url = 'http://192.168.1.30:8080/';
  }


  getStudentsByOpportunity(opportunityID: number): any {
    let param = new HttpParams().appendAll({ "id": opportunityID })
    return this.http.get(this.url + 'portal/get_students_by_opportunity', { params: param });
  }


  // {params: new HttpParams().appendAll({"id": this.authService.hash!})}

  getAvailableOpportunitiesForStudent(): any {
    return this.http.get(this.url + 'portal/get_available_opportunities_for_student', { params: new HttpParams().appendAll({ "id": this.authService.hash! }) });
  }

  getOpportunityInfo(id: number) {
    return this.http.get(this.url + 'portal/get_opportunity_info?id=' + id);
  }

  getOpportunitiesByPartnerID(partnerID: number): any {
    return this.http.get(this.url + 'portal/get_opportunities_by_partner_id', { params: new HttpParams().appendAll({ "id": this.authService.hash! }) });
  }


  getSignedUpOpportunities() {
    return this.http.get(this.url + 'portal/get_opportunities_by_student_id', { params: new HttpParams().appendAll({ "id": this.authService.hash! }) })
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

  studentSignup(student_id: number, id: number) {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/attempt_student_signup', { student_id: student_id, id: id }, headers = headers)
  }

  editOpportunity(opportunity: Opportunity): Observable<any> {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/edit_opportunity', opportunity, headers = headers)
  }

}
