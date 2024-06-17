import { Component } from '@angular/core';
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
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isAdmin=this.tokenStorageService.getIsAdmin(this.roles)
      this.isUser=this.tokenStorageService.getIsUser(this.roles)

      this.username = user.username;
    }
  }
  

  logout(): void {
    this.tokenStorageService.signOut();
    //window.location.href = '/login';
  }
}
