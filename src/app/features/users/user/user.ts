import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../../core/services/auth';
import { AsyncPipe, DatePipe } from '@angular/common';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  currentUser: any = null;
  selectedTab: 'Notifications' | 'Mes Votes' = 'Notifications';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      this.currentUser = user;
    });
  }

  selectTab(tab: 'Notifications' | 'Mes Votes') {
    this.selectedTab = tab;
  }

  updateUrl(event: any) {
    console.log("Chargement de la PP par défault...");
    event.target.src = 'PP_zero_two.jpg';
  }
}

