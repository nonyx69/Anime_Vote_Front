import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const user = this.getUserFromStorage();
      if (user) {
        this.userSubject.next(user);
      }
    }
  }

  private getUserFromStorage(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('auth_user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}user/sign`, userData);
      this.router.navigate(['/login']);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}user/login`, credentials).pipe(
      tap((response) => {
        if (response.status === 'ok' && isPlatformBrowser(this.platformId)) {
          localStorage.setItem('auth_token', response.result.token);
          localStorage.setItem('auth_user', JSON.stringify(response.result));
          this.userSubject.next(response.result);
          this.router.navigate(['/user']);
        }
      }),
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      this.router.navigate(['/']);
    }
    this.userSubject.next(null);
  }
}
