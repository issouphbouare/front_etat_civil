import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 
import { Militant } from 'src/app/models/militant'; 
import { MilitantService } from 'src/app/services/militant.service'; 
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
public url: string= "http://localhost:8082/login/";
public url1: string="http://localhost:8082/militants/";
public url3: string="http://localhost:8082/divisions/";

  //public url: string="https://gestiseance.herokuapp.com/login/"; /*connexion au serveur distant*/
  //public url1: string="https://gestiseance.herokuapp.com/professeurs/"; /*connexion au serveur distant*/

  public division: any;
  public divisions :any;
  public coordination :any;
  public coordinations :any;
  public url2 : string='';
  public telephone : number=0;
  public militant : any;
  public mode : number=0;
  selectedCoordination: any;
  selectedDivision: string='';
  sub :string ="";

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
    if(this.militant.section=="Secondaire"){
      this.sub="hidden";
    }
    this.onGetDivCur()
     //console.log(this.prof);
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
      motDePasse : ['',Validators.required],
      poste : ['',Validators.required],
      coordination : ['',Validators.required],
      genre : [''],
      statut : ['',Validators.required]
  });
  this.onGetCoordinations()

  }
  onSubmit(){
    console.log(this.formEdit.value);
    console.log(this.url1+this.militant.id);
    this.url2=this.url1+this.militant.id;

    console.log(this.url);
    if(this.formEdit.value.section=="Secondaire") {
      this.formEdit.value.subdivision="";
    }
    this.apiService.Update(this.url2, this.formEdit.value).
    subscribe( data => {
      console.log(data);
      alert(" Profil modifiée avec succes !");
      this.authService.logout();
      }, err=>{
        console.log(err);
        alert("Il  existe deja un Professeur avec le meme numero de telephone "+this.formEdit.value.tel);
 
      });  
 
  }

  ChangeR(){
    this.mode=1;
  }
  Change(){
    this.mode=0;
  }

  selectedGenre: string='';
   optionsG: { value: string, label: string }[] = [
     { value: 'Femme', label: 'Femme' },
     { value: 'Homme', label: 'Homme' }
     
   ];
   onSelectionGenre() {
     
   }
selectedValue: string='';
  options: { value: string, label: string }[] = [
    { value: 'Secondaire', label: 'Secondaire' },
    { value: 'Fondamentale et Préscolaire', label: 'Fondamentale et Préscolaire' }
    
  ];
  onSelectionChange() {
    // Cette fonction sera appelée lorsque la sélection change.
    console.log('Option sélectionnée :', this.selectedValue);
    if(this.selectedValue=="Secondaire") this.sub="hidden";
    else this.sub="text";
  }

  onGetCoordinations(){
    this.apiService.getCoordinations().subscribe((data: any)=>{
      this.coordinations=data;
        console.log(this.coordinations);
        }, err=>{
            console.log(err);
          });
   }
 
   
   onGetDivByCoor(){
     this.apiService.getDivisionsByCoordination(this.coordination._links.self.href).
     subscribe((data: any)=>{
       this.divisions=data;
       console.log(this.divisions)
         
         }, err=>{
             console.log(err);
           });
    }

    onGetDivCur(){
      this.apiService.getDivCur(this.url1+this.militant.id+"/division").
      subscribe(data => {
        this.division = data;
        console.log(this.division);
        this.onGetCoorCur()
      }, err => {
        console.log(err);
      });
    }

    onGetCoorCur(){
      this.apiService.getCoorCur(this.url3+this.division.id+"/coordination").
      subscribe(data => {
        this.coordination = data;
        this.onGetDivByCoor()
        console.log(this.coordination);
      }, err => {
        console.log(err);
      });
    }
    

  }


