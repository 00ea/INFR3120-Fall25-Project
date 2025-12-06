import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(private apiService: ApiService) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.apiService.register(this.email, this.password, this.confirmPassword).subscribe({
      next: () => {
        window.location.href = '/';
      },
      error: (err) => {
        this.error = 'Registration failed';
      }
    });
  }
}
