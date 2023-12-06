import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams
} from '@angular/common/http';
import { Opportunity } from './models/opportunity';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = 'http://127.0.0.1:8000/';
    // this.url = 'http://192.168.1.30:8080/';
  }

  getStudentsByOpportunity(opportunityID: number): any {
    let param = new HttpParams().appendAll({ "id": opportunityID })
    return this.http.get(this.url + 'portal/get_students_by_opportunity', { params: param });
  }

  getAvailableOpportunitiesForStudent(): Observable<any> {
    return this.http.get(this.url + 'portal/get_available_opportunities_for_student', { params: new HttpParams().appendAll({ "id": this.authService.hash! }) });
  }

  getOpportunityInfo(id: number): Observable<any> {
    return this.http.get(this.url + 'portal/get_opportunity_info', { params: new HttpParams().appendAll({ "id": id }) });
  }

  getOpportunitiesByPartnerID(): Observable<any> {
    return this.http.get(this.url + 'portal/get_opportunities_by_partner_id', { params: new HttpParams().appendAll({ "id": this.authService.hash! }) });
  }

  getSignedUpOpportunities(): Observable<any> {
    return this.http.get(this.url + 'portal/get_opportunities_by_student_id', { params: new HttpParams().appendAll({ "id": this.authService.hash! }) })
  }

  logout(): Observable<any> {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/logout', { hash: this.authService.hash }, headers = headers)
  }

  attemptLogin(email: string, password: string): Observable<any> {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/attempt_login', { email: email, password: password }, headers = headers)
  }

  createOpportunity(opportunity: Opportunity): Observable<any> {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/create_opportunity', opportunity, headers = headers)
  }

  deleteOpportunity(opportunityID: number): Observable<any> {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/delete_opportunity', { id: opportunityID, hash: this.authService.hash! }, headers = headers)
  }

  studentRegister(email: string, name: string, password: string): Observable<any> {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/attempt_student_register', { email: email, name: name, password: password }, headers = headers)
  }

  partnerRegister(email: string, title: string, password: string): Observable<any> {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/attempt_partner_register', { email: email, title: title, password: password }, headers = headers)
  }

  studentUnSignup(id: number) {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/attempt_student_signup', { hash: this.authService.hash!, id: id }, headers = headers)
  }

  studentSignup(id: number) {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/attempt_student_signup', { hash: this.authService.hash!, id: id }, headers = headers)
  }

  editOpportunity(opportunity: Opportunity): Observable<any> {
    let headers: any = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin' })
    return this.http.post(this.url + 'portal/edit_opportunity', opportunity, headers = headers)
  }

}
