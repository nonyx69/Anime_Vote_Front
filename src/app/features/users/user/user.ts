import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// A changer pour personne qui ce connecte avec token
interface UserProfile {
  username: string;
  joinDate: string;
  votes: number;
  comments: number;
  avatarUrl: string;
}
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  currentUser: UserProfile = {
    username: 'Boubou_Maxime',
    joinDate: '18 Mars 2026',
    votes: 0,
    comments: 0,
    avatarUrl: './PP_zero_two.jpg',
  };

  ngOnInit(): void {}

  selectedTab: 'Notifications' | 'Mes Votes' = 'Notifications';

  constructor() {}

  /**
   *
   * @param tab
   */
  selectTab(tab: 'Notifications' | 'Mes Votes') {
    this.selectedTab = tab;
    console.log(`Filtre sélectionné : ${tab}`);
  }
}