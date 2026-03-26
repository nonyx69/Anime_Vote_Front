import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

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

  isEditModalOpen = false;
  tempBio: string = '';
  tempImage: string = '';

  constructor(
    public authService: AuthService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      this.currentUser = user;
    });
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
    const baseUrl = 'http://localhost:8000';

    const bioRequest = this.http.post(`${baseUrl}/user/bio`, { bio: this.tempBio }, { headers });
    const photoRequest = this.http.post(
      `${baseUrl}/user/photo`,
      { image_profil: this.tempImage },
      { headers },
    );

    forkJoin([bioRequest, photoRequest]).subscribe({
      next: () => {
        const timestampedImage = this.tempImage.startsWith('data:')
          ? this.tempImage
          : `${this.tempImage}?t=${Date.now()}`;

        this.updateLocalData('bio', this.tempBio);
        this.updateLocalData('image_profil', timestampedImage);

        this.authService.updateUser({ ...this.currentUser });

        this.isEditModalOpen = false;
        console.log('Profil mis à jour et synchronisé !');
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du profil', err);
      },
    });
  }

  private updateLocalData(key: string, value: string) {
    if (this.currentUser?.result?.profil) {
      this.currentUser.result.profil[key] = value;
    }
    if (this.currentUser?.profil) {
      this.currentUser.profil[key] = value;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.tempImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  selectTab(tab: 'Notifications' | 'Mes Votes') {
    this.selectedTab = tab;
  }

  updateUrl(event: any) {
    event.target.src = 'assets/PP_zero_two.jpg';
  }
}
