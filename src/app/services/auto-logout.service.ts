import { Injectable, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutoLogoutService {
  private inactivityTimeout: number = 15 * 60 * 1000; // 15 minutes en millisecondes
  private logoutTimer: any;

  constructor() {
    this.resetTimer();
  }

  resetTimer() {
    clearTimeout(this.logoutTimer);
    this.logoutTimer = setTimeout(() => {
      // Déconnexion de l'utilisateur
      // Nettoyage du localStorage
      localStorage.clear();
      // Redirigez l'utilisateur vers la page de connexion
      // Exemple : Redirection vers /login
      window.location.href = '/connect'; // Remplacez '/login' par l'URL de votre page de connexion
    }, this.inactivityTimeout);
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:keydown', ['$event'])
  onUserInteraction() {
    this.resetTimer();
  }
}
