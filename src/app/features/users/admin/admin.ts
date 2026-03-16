import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: 'admin.component.html',
  styleUrl: 'admin.component.css',
})
export class AdminComponent {
  selectedTab: 'Analytiques' | 'Mes sondages' | undefined;

  constructor() {}

  /**
   *
   * @param tab
   */
  selectTab(tab: 'Analytiques' | 'Mes sondages' | undefined) {
    this.selectedTab = tab;
    console.log(`Filtre sélectionné : ${tab}`);
  }
}
