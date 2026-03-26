import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
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

  // --- NOUVELLE MÉTHODE POUR LA MISE À JOUR EN DIRECT ---
  updateUser(updatedUser: any): void {
    if (isPlatformBrowser(this.platformId)) {
      // 1. On met à jour le localStorage pour que les changements persistent au refresh
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
    // 2. On pousse la nouvelle valeur dans le Subject pour mettre à jour les composants
    this.userSubject.next(updatedUser);
  }

  private getUserFromStorage(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('auth_user');
      try {
        return user ? JSON.parse(user) : null;
      } catch (e) {
        console.error('Erreur de parsing du user dans le stockage', e);
        return null;
      }
    }
    return null;
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}user/sign`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}user/login`, credentials).pipe(
      tap((response) => {
        // Ajustement selon ta structure : on stocke tout le "result" qui contient le user et le token
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
    }
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
}
