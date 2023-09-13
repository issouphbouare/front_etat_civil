import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationCancel, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Militant } from 'src/app/models/militant'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public militant : any;
  public user : any;
  public erreur : number =0;
  public erreur1 : number =0;
  login : FormGroup= new FormGroup({});
baseUrl: string = "http://localhost:8082/login/"; 

  //baseUrl: string="http://62.171.169.168:8080/Synefct_documents-0.0.1-SNAPSHOT/login/"; /*connexion au serveur distant*/

  constructor(private formBuilder:FormBuilder, 
                private apiResponse : AuthService,             
                    private  router: Router) { }

  ngOnInit(): void {
    
    this.login=this.formBuilder.group({
      telephone : ['',Validators.required],
      motDePasse : ['',Validators.required]});
      this.erreur=0;
      this.erreur1=0;
  }





  onSubmit(){
    console.log(this.login.value);
    console.log(this.baseUrl+this.login.value.telephone)
  const a=this.apiResponse.getCon(this.baseUrl+this.login.value.telephone).
  subscribe( (data : any) => {
    this.user=data;
     console.log(this.user);
     if (this.user.motDePasse==this.login.value.motDePasse &&
      this.user.statut=="Actif" ) {
  this.apiResponse.signIn(this.user);
  this.router.navigate(['/']);
  }
  if (this.user.motDePasse!=this.login.value.motDePasse &&
    this.user.statut=="Actif" ) {this.erreur = 1; this.erreur1=0}
    if (this.user.motDePasse==this.login.value.motDePasse &&
    this.user.statut!="Actif" ) {this.erreur = 0; this.erreur1=1}
  if (this.user.motDePasse!=this.login.value.motDePasse &&
      this.user.statut!="Actif" ) {this.erreur1=1; this.erreur=1;}
 
  
  },(err) =>console.log(err)); 

  
    
            
  
  
}


  
}

