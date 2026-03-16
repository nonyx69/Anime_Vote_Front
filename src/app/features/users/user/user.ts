import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {}
