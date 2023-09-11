import { Injectable } from '@angular/core';
import { Role } from './enums/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUsername: string = "";
  userRole?: Role;
  authorized: boolean = false;
  constructor() { }
}
