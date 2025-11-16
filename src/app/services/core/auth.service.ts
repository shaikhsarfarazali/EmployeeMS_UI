import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}auth/`;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  register(credentials: { fullName: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}register`, credentials, { responseType: 'text' });
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  getUserRole(): string | null {
    const token = (this.getToken());

    if (!token) return null;

    const decoded = this.jwtHelper.decodeToken(token);
    return decoded['role'] || null;
  }

  getUserEmail(): string | null {
    const token = this.getToken();

    if (!token) return null;
    const decoded = this.jwtHelper.decodeToken(token);

    return decoded['email'] || null;
  }
}
