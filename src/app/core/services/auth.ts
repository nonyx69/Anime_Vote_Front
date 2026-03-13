import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrlDev;

  constructor(private http: HttpClient) {}

  register(userData: any) {
    return this.http.post(`${this.apiUrl}user/sign`, userData);
  }

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}user/login`, credentials);
  }
  logout() {
    localStorage.removeItem('userPseudo');
    localStorage.removeItem('auth_token');
  }
}
