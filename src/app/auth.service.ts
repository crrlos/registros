import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated: boolean = false;

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  setAuthenticated(authenticated: boolean) {
    this.authenticated = authenticated;
  }

  constructor() {
    if(window.localStorage.getItem('uid')) this.authenticated = true;
   }
}
