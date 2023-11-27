import { Binary } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  partnerID: number = -1;
  studentID: number = -1;
  hash?: string;




  constructor(private cookieService: CookieService) {
    if (!this.hash) {
      this.getHash();
    }
  };

  cacheHash(): void {
    this.cookieService.set('hash', this.hash!)
  }

  getHash(): void {
    this.hash = this.cookieService.get('hash')
  }
}
