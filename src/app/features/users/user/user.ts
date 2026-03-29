import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe, DatePipe, CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  currentUser: any = null;
  selectedTab: 'Notifications' | 'Mes Votes' = 'Notifications';

  userVotes: any[] = [];
  isLoadingVotes: boolean = false;

  isEditModalOpen = false;
  tempBio: string = '';
  tempImage: string = '';

  private baseUrl = environment.apiUrl.endsWith('/') ? environment.apiUrl.slice(0, -1) : environment.apiUrl;

  constructor(
    public authService: AuthService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      this.currentUser = user;
      if (user) {
        this.loadVotes();
      }
    });
  }

  loadVotes() {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    this.isLoadingVotes = true;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any[]>(`${this.baseUrl}/api/votes`, { headers }).subscribe({
      next: (data) => {
        this.userVotes = data;
        this.isLoadingVotes = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des votes', err);
        this.isLoadingVotes = false;
      },
    });
  }

  selectTab(tab: 'Notifications' | 'Mes Votes') {
    this.selectedTab = tab;
    if (tab === 'Mes Votes' && this.userVotes.length === 0) {
      this.loadVotes();
    }
  }

  openEditModal() {
    const p = this.currentUser?.profil || this.currentUser?.result?.profil;
    this.tempBio = p?.bio || '';
    this.tempImage = p?.image_profil || '';
    this.isEditModalOpen = true;
  }

  saveProfile() {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    const bioRequest = this.http.post(
      `${this.baseUrl}/user/bio`,
      { bio: this.tempBio },
      { headers },
    );
    const photoRequest = this.http.post(
      `${this.baseUrl}/user/photo`,
      { image_profil: this.tempImage },
      { headers },
    );

    forkJoin([bioRequest, photoRequest]).subscribe({
      next: () => {
        const timestampedImage = this.tempImage.startsWith('data:') ? this.tempImage : `${this.tempImage}?t=${Date.now()}`;

        this.updateLocalData('bio', this.tempBio);
        this.updateLocalData('image_profil', timestampedImage);

        this.authService.updateUser({ ...this.currentUser });
        this.isEditModalOpen = false;
        console.log('Profil mis à jour et synchroniser !');
      },
      error: (err) => console.error('Erreur mise à jour profil', err),
    });
  }

  private updateLocalData(key: string, value: string) {
    if (this.currentUser?.result?.profil) this.currentUser.result.profil[key] = value;
    if (this.currentUser?.profil) this.currentUser.profil[key] = value;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.tempImage = e.target.result);
      reader.readAsDataURL(file);
    }
  }

  updateUrl(event: any) {
    event.target.src = 'images/PP/PP_zero_two.jpg';
  }
}
