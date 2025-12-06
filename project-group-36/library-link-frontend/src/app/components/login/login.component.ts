import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private apiService: ApiService) {}

  login() {
    this.apiService.login(this.email, this.password).subscribe({
      next: () => {
        window.location.href = '/';
      },
      error: (err) => {
        this.error = 'Invalid email or password';
      }
    });
  }
}
