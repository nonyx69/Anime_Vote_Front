import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  selectedTab: 'tous' | 'anime' | 'manga' = 'tous';

  constructor() {}

  /**
   *
   * @param tab
   */
  selectTab(tab: 'tous' | 'anime' | 'manga') {
    this.selectedTab = tab;
    console.log(`Filtre sélectionné : ${tab}`);
  }
}
