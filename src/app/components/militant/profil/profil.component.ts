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
//public  base="https://synefct.org/api"; /*connexion au serveur distant*/
//public url1: string=this.base+"/militants/";
//ublic urlCoor: string=this.base+"/coordinations/";
//public url3: string=this.base+"/divisions/";


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
  phone:number=0;
  mat:string='';
  editable:boolean=true;

  constructor(private formBuilder:FormBuilder,
    private apiService: MilitantService, private authService : AuthService,
    private  router:Router ,private route: ActivatedRoute) { }
    formEdit : FormGroup= new FormGroup({});

  ngOnInit() {
    console.log(this.authService.loggedMilitant);
    this.telephone=this.authService.loggedMilitant;
    this.authService.getCon(this.telephone.toString()).
  subscribe( data => {
    this.militant=data; 
    this.phone=this.militant.telephone;
    this.mat=this.militant.matricule;
    if(this.militant.section=="Secondaire"){
      this.sub="hidden";
    }
    this.onGetDivCur(this.militant)
     //console.log(this.prof);
  },err=>{console.log(err);});
  console.log(this.militant);

  this.formEdit=this.formBuilder.group({
    matricule : ['',Validators.required],
    telephone : ['',[Validators.required, Validators.min(50000000), Validators.max(100000000)]],
    prenom : ['',[Validators.required, Validators.pattern("([a-zA-Z]).{1,}")]],
    nom : ['',[Validators.required, Validators.pattern("([a-zA-Z]).{1,}")]],
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
    this.apiService.existByTelephone(this.formEdit.value.telephone).
    subscribe( (data:any) => { 
      if(data==false || this.formEdit.value.telephone==this.phone)
      this.existByMatrcule();
    else alert("Il  existe deja un militant avec le meme numéro de telephone : "+this.formEdit.value.telephone);
      console.log(data)
    },err=>{
      
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
     this.apiService.getDivisionsByCoordination(this.coordination.id.toString()).
     subscribe((data: any)=>{
       this.divisions=data;
       console.log(this.divisions)
         
         }, err=>{
             console.log(err);
           });
    }

    onGetDivCur(m:any){
      
      this.apiService.getDivCur(m.id.toString()).
      subscribe(data => {
        this.division = data;
        console.log(this.division);
        this.onGetCoorCur()
      }, err => {
        console.log(err);
      });
    }

    onGetCoorCur(){
      this.apiService.getCoorCur(this.division.id.toString()).
      subscribe(data => {
        this.coordination = data;
        this.onGetDivByCoor()
        console.log(this.coordination);
      }, err => {
        console.log(err);
      });
    }

    existByMatrcule(){
      this.apiService.existByMatricule(this.formEdit.value.matricule).
      subscribe( (data:any) => { 
        if(data==false || this.formEdit.value.matricule==this.mat)
        this.editMilitant();
      else alert("Il  existe deja un militant avec le meme numéro matricule : "+this.formEdit.value.matricule);
        console.log(data)
      },err=>{
        
      });
    }
    
    editMilitant(){
      
    //console.log(this.formEdit.value.division);
    //console.log(this.url1+this.militant.id);
    //this.url2=this.url1+this.militant.id;

    if(this.formEdit.value.section=="Secondaire") {
      this.formEdit.value.subdivision="";
    }

    this.formEdit.value.nom=this.formEdit.value.nom.toUpperCase()
      this.formEdit.value.prenom=this.formEdit.value.prenom.charAt(0).toUpperCase()+ this.formEdit.value.prenom.slice(1);
      this.formEdit.value.subdivision=this.formEdit.value.subdivision.charAt(0).toUpperCase()+ this.formEdit.value.subdivision.slice(1);
      this.formEdit.value.comite=this.formEdit.value.comite.toUpperCase();   
    this.apiService.UpdateProfil(this.militant.id.toString(), this.formEdit.value).
    subscribe( data => {
      console.log(data);
      alert(" Profil modifiée avec succes !");
      this.authService.logout();
      }, err=>{
        console.log(err);
      });  
    }

  }


