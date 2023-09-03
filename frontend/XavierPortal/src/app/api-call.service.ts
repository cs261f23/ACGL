import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders
} from '@angular/common/http';

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

}
