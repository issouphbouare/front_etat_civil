import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Division } from 'src/app/models/division';
import { Militant } from 'src/app/models/militant';
import { MilitantService } from 'src/app/services/militant.service';


@Component({
  selector: 'app-add-militant',
  templateUrl: './add-militant.component.html',
  styleUrls: ['./add-militant.component.css']
})
export class AddMilitantComponent implements OnInit {
  base="https://synefct.org/api"; /*connexion au serveur distant*/

  public division: any;
  public divisions :any;
  public coordinations :any;
  public militant : any;
  public defaultPassword: string ="0000";
  public defaultPoste: string = "Militant";
  public defaultStatut: string = "Inactif";
  //coordinations: any[] = [];
selectedCoordination: any;
//divisions: any[] = [];
selectedDivision: string='';
sub :string ="hidden";
etape2: boolean = false;
  isFemale: boolean = false;
  affiche:boolean=false;



  constructor(private formBuilder:FormBuilder,
     private apiService: MilitantService, private route:ActivatedRoute,
    private  router:Router) { }
    formAdd : FormGroup= new FormGroup({});
    


  ngOnInit() {
    this.formAdd=this.formBuilder.group({
      matricule : ['',Validators.required],
      telephone : ['',[Validators.required, Validators.min(50000000), Validators.max(100000000)]],
      prenom : ['',[Validators.required, Validators.pattern("([a-zA-Z]).{1,}")]],
      nom : ['',[Validators.required, Validators.pattern("([a-zA-Z]).{1,}")]],
      section : ['',Validators.required],
      comite : [''],
      subdivision : [''],
      division : ['',Validators.required],
      motDePasse : ['',Validators.required],
      poste : ['',Validators.required],
      coordination : ['',Validators.required],
      genre : ['',Validators.required],
      statut : ['',Validators.required]
    });
    this.sub="hidden"; this.etape2=false; this.affiche=false;
    this.onGetCoordinations()
  }

   

  onSubmit(){ if(this.formAdd.value.telephone!=null && this.formAdd.value.matricule!="")
    this.apiService.existByTelephone(this.formAdd.value.telephone).
    subscribe( (data:any) => { 
      if(data==false)
      this.existByMatrcule();
    else alert("Il  existe deja un militant avec le meme numero de telephone : "+this.formAdd.value.telephone);
      console.log(data)
    },err=>{
      
    });
    else alert("Les champs matricules et telephone doivent etre correctement renseignés")
    
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
     console.log(this.selectedCoordination);
     
    this.apiService.getDivisionsByCoordination(this.selectedCoordination).subscribe((data: any)=>{
      this.divisions=data;
      if(data!=null) this.affiche=true;
        
        }, err=>{
            console.log(err);
          });
   }
   
   selectedGenre: string='';
   optionsG: { value: string, label: string }[] = [
     { value: '', label: '' },
     { value: 'Femme', label: 'Femme' },
     { value: 'Homme', label: 'Homme' }
     
   ];
   onSelectionGenre() {
     
   }
           


selectedValue: string='';
  options: { value: string, label: string }[] = [
    { value: '', label: '' },
    { value: 'Secondaire', label: 'Secondaire' },
    { value: 'Fondamentale et Préscolaire', label: 'Fondamentale et Préscolaire' }
    
  ];
  onSelectionChange() {
    // Cette fonction sera appelée lorsque la sélection change.
    console.log('Option sélectionnée :', this.selectedValue);
    if(this.selectedValue=="Secondaire") this.sub="hidden";
    else this.sub="text";
  }

  OnSuivant(){this.etape2=true;}
  onPre(){this.etape2=false;}

  existByMatrcule(){
    this.apiService.existByMatricule(this.formAdd.value.matricule).
    subscribe( (data:any) => { 
      if(data==false)
      this.addMilitant();
    else alert("Il  existe deja un militant avec le meme numero matricule : "+this.formAdd.value.matricule);
      console.log(data)
    },err=>{
      
    });
  }

  addMilitant(){
    console.log(this.formAdd.value);
    if(this.formAdd.value.poste=="") this.formAdd.value.poste="Militant";
    this.formAdd.value.nom=this.formAdd.value.nom.toUpperCase()
      this.formAdd.value.prenom=this.formAdd.value.prenom.charAt(0).toUpperCase()+ this.formAdd.value.prenom.slice(1);
      this.formAdd.value.subdivision=this.formAdd.value.subdivision.charAt(0).toUpperCase()+ this.formAdd.value.subdivision.slice(1);
      this.formAdd.value.comite=this.formAdd.value.comite.charAt(0).toUpperCase()+ this.formAdd.value.comite.slice(1);
   
    this.apiService.Create(this.formAdd.value).
    subscribe( data => {
        alert("Le Compte du Militant(e) Mr/Mme : "+this.formAdd.value.nom+
        "  de login : "+this.formAdd.value.telephone+
        "  et de mot de passe : 0000 est crée avec succès  mais pour pouvoir se connecter veuillez activer votre compte auprès de votre Secrétaire de Division"); 
        this.router.navigate(['login']);
      },err=>{
        console.log(err);
        alert("Il  existe deja un militant avec le meme numero de telephone : "+this.formAdd.value.telephone+
        "ou le meme numéro matricule : "+this.formAdd.value.matricule);
      });  
  }

}

