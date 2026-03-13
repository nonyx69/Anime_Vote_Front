import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };

  showPassword = false;

  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{10,}$';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    console.log('Tentative de connexion avec :', this.credentials);

    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        console.log('Connexion réussie !', response);
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
        }
        // this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erreur de connexion', err);
        alert(err.error?.message || 'Identifiants incorrects');
      },
    });
  }
}
