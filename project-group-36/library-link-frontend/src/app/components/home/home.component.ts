import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  isLoggedIn = false;
  newTitle = '';
  newAuthor = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.apiService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.isLoggedIn = true;
      },
      error: () => {
        this.isLoggedIn = false;
      }
    });
  }

  addBook() {
    if (this.newTitle && this.newAuthor) {
      this.apiService.addBook(this.newTitle, this.newAuthor).subscribe(() => {
        this.newTitle = '';
        this.newAuthor = '';
        this.loadBooks();
      });
    }
  }

  deleteBook(id: string) {
    if (confirm('Delete this book?')) {
      this.apiService.deleteBook(id).subscribe(() => {
        this.loadBooks();
      });
    }
  }

  returnBook(id: string) {
    this.apiService.returnBook(id).subscribe(() => {
      this.loadBooks();
    });
  }

  logout() {
    this.apiService.logout().subscribe(() => {
      window.location.href = '/auth/login';
    });
  }
}
