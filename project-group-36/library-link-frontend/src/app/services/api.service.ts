import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://infr3120-fall25-project-1-6s4a.onrender.com';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password }, { 
      withCredentials: true 
    });
  }

  register(email: string, password: string, confirmPassword: string) {
    return this.http.post(`${this.baseUrl}/auth/register`, { email, password, confirmPassword }, { 
      withCredentials: true 
    });
  }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/`, { withCredentials: true });
  }

  addBook(title: string, author: string) {
    return this.http.post(`${this.baseUrl}/add`, { title, author }, { 
      withCredentials: true 
    });
  }

  deleteBook(id: string) {
    return this.http.post(`${this.baseUrl}/delete/${id}`, {}, { 
      withCredentials: true 
    });
  }

  returnBook(id: string) {
    return this.http.post(`${this.baseUrl}/return/${id}`, {}, { 
      withCredentials: true 
    });
  }

  logout() {
    return this.http.get(`${this.baseUrl}/auth/logout`, { 
      withCredentials: true 
    });
  }
}
