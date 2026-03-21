import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe, DatePipe, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  currentUser: User | null = null;
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

