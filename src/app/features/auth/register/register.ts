import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user = {
    pseudo: '',
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onRegister() {
    console.log('Envoi des données :', this.user);

    this.authService.register(this.user).subscribe({
      next: (res: any) => {
        console.log('Réponse du serveur :', res);
        alert('Compte créé avec succès !');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("Erreur lors de l'inscription :", err);
        alert(err.error?.message || 'Une erreur est survenue');
      },
    });
  }
}
