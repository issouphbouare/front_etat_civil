import { ResourceLoader } from '@angular/compiler';
import { Component, Input } from '@angular/core';
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
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.getIsAdmin(this.roles)
      this.getIsUser(this.roles)

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }
  getIsAdmin(roles:any){
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "ROLE_ADMIN") {
        this.isAdmin = true;
        break;
      }
    }
    
  }

  getIsUser(roles:any){
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "ROLE_USER") {
        this.isUser = true;
        break
      }
    }
    
  }

  logout(): void {
    this.tokenStorageService.signOut();
    //window.location.href = '/login';
  }
}
