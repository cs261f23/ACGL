import { Binary } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  partnerID: number = -1;
  studentID: number = -1;
  hash?: string;
  constructor() { }
}
