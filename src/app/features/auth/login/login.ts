import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  showPassword = false;
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{10,}$';

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.authService.user$.subscribe((user) => {
          if (user) {
            // VERIFICATION DES ROLES
            if (user.roles && user.roles.includes('ROLE_ADMIN')) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/user']);
            }
          }
        });
      },
      error: (err) => {
        alert(err.error?.message || 'Erreur lors de la connexion');
      },
    });
    alert('Mot de passe ou identifiant incorrect');
  }
}
