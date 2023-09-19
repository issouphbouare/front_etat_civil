import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Apiresponse } from '../models/Apiresponse';
import { Militant } from '../models/militant';
import { MilitantService } from './militant.service'; 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  public loggedMilitant:number=0;
  public poste: String='';
  public username: String='';
  public isloggedIn: Boolean = false;

  constructor(private http : HttpClient,private router : Router) { }
  
     
 
 baseUrl: string = "http://localhost:8082/login/";  

 //baseUrl="https://gestiseance.herokuapp.com/login/"; /*connexion au serveur distant*/

 
 getCon(c : string):Observable<any>{
   return this.http.get<any>(c);
 }

 getUser(tel:number):Observable<Militant>
{
const url = "this.baseUrl"+tel;
return this.http.get<Militant>(url);
}

signIn(militant :Militant){
  this.loggedMilitant = militant.telephone;
  this.isloggedIn = true;
  this.poste = militant.poste;
  this.username="Mr/Mme "+militant.nom;
  localStorage.setItem('loggedMilitant',this.loggedMilitant.toString());
  localStorage.setItem('isloggedIn',String(this.isloggedIn));
  localStorage.setItem('username',String(this.username));
  localStorage.setItem('poste',String(this.poste));
  this.getMilitantPoste(militant.telephone);
  this
  }

  isAdmin():Boolean{
    let admin: Boolean = false;
    if (!this.poste) //this.roles== undefiened
    return false;
    if(this.poste == 'Militant') {
    admin = true;
    }
    return admin;
    }

  
    
    getMilitantPoste(telephone :number){
      this.getUser(telephone).subscribe((militant: Militant)=>{
      this.poste = militant.poste;
      });
      }
 


logout() {
  this.isloggedIn= false;
  this.loggedMilitant = 0;
  this.poste = '';
  this.username='';
  localStorage.removeItem('loggedMilitant');
  localStorage.removeItem('isloggedIn');
  localStorage.removeItem('username');
  localStorage.removeItem('poste');
  this.router.navigate(['/']);
}

setLoggedProfFromLocalStorage(tel: number) {
  this.loggedMilitant = tel;
  this.isloggedIn = true;
  this.getMilitantPoste(tel);
  }
  
  

}


