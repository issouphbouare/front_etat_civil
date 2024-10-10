import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  isAdmin = false;
  isUser = false;
  username?: string;
  isMenuCollapsed = true; // Variable pour gérer l'état du menu
  activeMenu: string = ''; // Variable pour suivre l'élément actif

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router
  ) {
    // Subscribe to router events to close the menu after navigation
    this.router.events.subscribe(() => {
      this.isMenuCollapsed = true; // Close the menu after navigation
    });
   }

   closeMenu(menuItem?: string) {
    if(menuItem==="")
    this.isMenuCollapsed = true; // Fermer le menu après un clic
    if (menuItem) {
      this.activeMenu = menuItem; // Mettre à jour l'élément actif
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isAdmin=this.tokenStorageService.getIsAdmin(this.roles)
      this.isUser=this.tokenStorageService.getIsUser(this.roles)

      this.username = user.username;
    }
    this.closeMenu('Citoyens')
  }


  logout(): void {
    this.tokenStorageService.signOut();
    //window.location.href = '/login';
  }
}
