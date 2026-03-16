import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: 'admin.component.html',
  styleUrl: 'admin.component.css',
})
export class AdminComponent {
  selectedTab: 'Analytiques' | 'Mes sondages' = 'Analytiques';

  constructor() {}

  /**
   *
   * @param tab
   */
  selectTab(tab: 'Analytiques' | 'Mes sondages') {
    this.selectedTab = tab;
    console.log(`Filtre sélectionné : ${tab}`);
  }
}
