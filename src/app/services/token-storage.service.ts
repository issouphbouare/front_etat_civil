import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, timer } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private http: HttpClient, private router: Router) { }

  isAdmin = false;
  isUser = false;

  signOut(): void {
    window.sessionStorage.clear();
    this.reloadPage()
    //this.router.navigate(['/login']);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      
      return JSON.parse(user);
      
    }

    return {};
  }

  getHeaders(): HttpHeaders {
    // Crée les en-têtes avec le token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });

  }

  reloadPage(): void {
    this.router.navigate(['login']).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 100); // délai de 100 millisecondes
    });
  }
  getIsAdmin(roles:any){
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "ROLE_ADMIN") {
        this.isAdmin = true;
        break;
      }
    }
    return this.isAdmin;
  }

  getIsUser(roles:any){
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "ROLE_USER") {
        this.isUser = true;
        break
      }
    }
    return this.isUser
  }

}

