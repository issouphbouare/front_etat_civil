import { ResourceLoader } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Militant } from 'src/app/models/militant';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public i:number=6;

  //public cu: number;
  @Input() user: any=localStorage.getItem('user');
  constructor (private router : Router, public authService : AuthService){}
  ngOnInit(): void{
    let isloggedin;
    let loggedMilitant: any;
    isloggedin = localStorage.getItem('isloggedIn');
    loggedMilitant = localStorage.getItem('loggedMilitant');
    if (isloggedin!="true" || !loggedMilitant)
    this.router.navigate(['/login']);
    else
    this.authService.setLoggedProfFromLocalStorage(loggedMilitant);

  }
  onDeconnecter(){
    //localStorage.removeItem('user');
    //this.router.navigate(['/login']);
    this.authService.logout();

  }

}
