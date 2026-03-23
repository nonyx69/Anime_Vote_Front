import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { isPlatformBrowser } from '@angular/common';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrl: 'admin.component.css',
})
export class AdminComponent implements OnInit {
  selectedTab: 'Analytiques' | 'Mes sondages' = 'Analytiques';
  private platformId = inject(PLATFORM_ID);

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.user$.pipe(take(1)).subscribe((user) => {
        if (!user && !localStorage.getItem('token')) {
          this.router.navigate(['/login']);
        }
      });

      this.authService.user$
        .pipe(
          filter((user) => user !== null),
          take(1),
        )
        .subscribe((user) => {
          const isAdmin = user && user.roles && user.roles.includes('ROLE_ADMIN');

          if (!isAdmin) {
            console.error('Accès interdit !');
            this.router.navigate(['/user']);
          }
        });
    }
  }

  selectTab(tab: 'Analytiques' | 'Mes sondages') {
    this.selectedTab = tab;
  }
}
