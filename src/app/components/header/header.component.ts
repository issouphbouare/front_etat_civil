import { ResourceLoader } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Militant } from 'src/app/models/militant';
import { AuthService } from 'src/app/services/auth.service';
import { MilitantService } from 'src/app/services/militant.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public i:number=6;
  public total:number=0;
  public username:any;

  //public cu: number;
  constructor (private router : Router,private militantService: MilitantService,
     public authService : AuthService, private userService: UserService){}
     @Input() user: any=localStorage.getItem('username');
  ngOnInit(): void{
    let us=localStorage.getItem('username');
    let poste;
    this.username= this.userService.userName$;
    let isloggedin;
    let loggedMilitant: any;
    isloggedin = localStorage.getItem('isloggedIn');
    loggedMilitant = localStorage.getItem('loggedMilitant');
    poste = localStorage.getItem('poste');
    if (isloggedin!="true" || !loggedMilitant)
    this.router.navigate(['/login']);
    else
    this.authService.setLoggedProfFromLocalStorage(loggedMilitant);
  this.getMilitantActif();

  }
  onDeconnecter(){
    //localStorage.removeItem('user');
    //this.router.navigate(['/login']);
    this.user=null;
    this.authService.logout();

  }

  getMilitantActif(){
    this.militantService.getMilitantActif().
    subscribe( (data:any) => { 
      this.total=data;
      console.log(this.total);
    },err=>{
      
    });
  }

}
