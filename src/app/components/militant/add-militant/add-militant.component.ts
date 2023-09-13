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

  public division: any;
  public divisions :any;
  public coordinations :any;
  public militant : any;
  public defaultPassword: string ="0000";
  public defaultPoste: string = "militant";
  public defaultStatut: string = "inactif";
  //coordinations: any[] = [];
selectedCoordination: any;
//divisions: any[] = [];
selectedDivision: string='';
sub :string ="text";
etape2: boolean = false;
  isFemale: boolean = false;



  constructor(private formBuilder:FormBuilder,
     private apiService: MilitantService, private route:ActivatedRoute,
    private  router:Router) { }
    formAdd : FormGroup= new FormGroup({});
    


  ngOnInit() {
    this.formAdd=this.formBuilder.group({
      matricule : ['',Validators.required],
      telephone : ['',Validators.required],
      prenom : ['',Validators.required],
      nom : ['',Validators.required],
      section : ['',Validators.required],
      comite : ['',Validators.required],
      subdivision : ['',Validators.required],
      division : ['',Validators.required],
      motDePasse : ['',Validators.required],
      poste : ['',Validators.required],
      coordination : ['',Validators.required],
      genre : ['',Validators.required],
      statut : ['',Validators.required]
    });
    this.sub="text"; this.etape2=false;
    this.onGetCoordinations()
  }

   

  onSubmit(){ 
    console.log(this.formAdd.value);
    this.apiService.Create(this.formAdd.value).
    subscribe( data => {
        alert("Le Compte du Militant(e) Mr/Mme : "+this.formAdd.value.nom+
        "  de login : "+this.formAdd.value.telephone+
        "  et de mot de passe : 0000 est crée avec succès !"); 
        this.router.navigate(['login']);
      },err=>{
        console.log(err);
        alert("Il  existe deja un militant avec le meme numero de telephone : "+this.formAdd.value.telephone);
      });  
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

}

