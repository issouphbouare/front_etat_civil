import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 
 
import { MilitantService } from 'src/app/services/militant.service'; 
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
public url: string= "http://localhost:8082/login/";
  public url1: string="http://localhost:8082/militants/";

  //public url: string="https://gestiseance.herokuapp.com/login/"; /*connexion au serveur distant*/
  //public url1: string="https://gestiseance.herokuapp.com/professeurs/"; /*connexion au serveur distant*/

  public url2 : string='';
  public telephone : number=0;
  public militant : any;
  public division : any;
  public erreur : number =0;
  public erreur1 : number =0;

  public actuel: string='';
  public new: string='';
  public confirm: string='';


  constructor(private formBuilder:FormBuilder,
    private apiService: MilitantService, private authService : AuthService,
    private  router:Router ,private route: ActivatedRoute) { }
    formEdit : FormGroup= new FormGroup({});

  ngOnInit() {
    console.log(this.authService.loggedMilitant);
    this.telephone=this.authService.loggedMilitant;
    this.authService.getCon(this.url+this.telephone).
  subscribe( data => {
    this.militant=data;
     console.log(this.militant);
     this.onGetDivCur()
  },err=>{console.log(err);});
  console.log(this.militant);

  this.formEdit=this.formBuilder.group({
    matricule : ['',Validators.required],
      telephone : ['',Validators.required],
      prenom : ['',Validators.required],
      nom : ['',Validators.required],
      section : [''],
      comite : [''],
      subdivision : [''],
      division : ['',Validators.required],
      poste : ['',Validators.required],
      genre : [''],
      statut : ['',Validators.required],

      motDePasse : ['',[Validators.required]],
      actuelPassword : ['',[Validators.required]],
      password1 : ['',[Validators.required]],
      confirmPassword : ['',[Validators.required]]
     
  });
  }
  onSubmit(){
    //console.log(this.formEdit.value);
    //console.log(this.url1+this.militant.id);
    this.url2=this.url1+this.militant.id;

    console.log(this.url2);
    if(this.formEdit.value.section=="Secondaire") {
      this.formEdit.value.subdivision="";
    }
    if(this.militant.motDePasse==this.formEdit.value.actuelPassword && 
      this.formEdit.value.motDePasse==this.formEdit.value.confirmPassword ){
        this.apiService.Update(this.url2, this.formEdit.value).
    subscribe( data => {
      //console.log(data);
      alert(" Mot de passe modifié avec succes !");
      this.authService.logout();
      }, err=>{
        console.log(err); 
      });
      } else if(this.militant.motDePasse!=this.formEdit.value.actuelPassword &&
        this.formEdit.value.motDePasse==this.formEdit.value.confirmPassword) this.erreur=1;
      else if( this.formEdit.value.motDePasse!=this.formEdit.value.confirmPassword &&
        this.militant.motDePasse==this.formEdit.value.actuelPassword) this.erreur1=1;
        else { this.erreur1=1; this.erreur=1;} 
 
  }
 
  

  onReprend(){
    this.erreur=0; this.erreur1=0
  }
  onGetDivCur(){
    this.apiService.getDivCur(this.url1+this.militant.id+"/division").
    subscribe(data => {
      this.division = data;
      console.log(this.division);
    }, err => {
      console.log(err);
    });
  }

}

