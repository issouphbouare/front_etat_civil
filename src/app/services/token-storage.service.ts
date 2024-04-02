import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, timer } from 'rxjs';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private http: HttpClient) { }

  signOut(): void {
    window.sessionStorage.clear();
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

  //gestion de la deconnection automatique apres expiration de token en 1800s
  private tokenExpirationTimeMs = 1800 * 1000; // 1800 secondes
  private logoutIntervalMs = 60000; // 60 secondes

  checkTokenExpiration(): Observable<any> {
    return timer(0, this.logoutIntervalMs).pipe(
      switchMap(() => this.http.get<any>('api/checkTokenExpiration'))
    );
  }

  logoutIfTokenExpired(): void {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = tokenData.exp * 1000; // convertir en millisecondes
      const currentTime = new Date().getTime();
      if (currentTime >= expirationTime) {
        // Déconnecter l'utilisateur
        this.signOut();
      }
    }
  }
}

