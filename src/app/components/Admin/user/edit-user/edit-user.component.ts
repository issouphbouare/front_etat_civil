import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/services/document.service';
import { FileUploadService } from 'src/app/services/file-upload-service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MilitantService } from 'src/app/services/militant.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  public user:any;
  formEdit : FormGroup= new FormGroup({});
  public militant : any;
  public url: string='';
  

  constructor(private apiService: MilitantService,private formBuilder:FormBuilder,
    private router:ActivatedRoute,private uploadService: FileUploadService,
    private  route: Router, private authService: AuthService) { }

    selectedPoste: string='';
  optionPoste: { value: string, label: string }[] = [
    { value: 'Militant', label: 'Militant' },
    { value: 'Sécretaire Général', label: 'Sécretaire Général' },
    { value: "Admin", label: "Admin" },
     
  ];
  onSelectionPoste() {
    // Cette fonction sera appelée lorsque la sélection change.
    console.log('Option sélectionnée :', this.selectedPoste);
  }

  selectedStatut: string='';
  optionStatut: { value: string, label: string }[] = [
    { value: 'Actif', label: 'Actif' },
    { value: 'Inactif', label: 'Inactif' }, 
  ];
  onSelectionStatut() {
    // Cette fonction sera appelée lorsque la sélection change.
    console.log('Option sélectionnée :', this.selectedStatut);
  }

  ngOnInit(): void {
    
    this.formEdit=this.formBuilder.group({
      matricule : ['',Validators.required],
      telephone : ['',Validators.required],
      prenom : ['',Validators.required],
      nom : ['',Validators.required],
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

     this.url=this.router.snapshot.params['id']
     this.getMilitant();

     this.authService.getCon(this.authService.loggedMilitant.toString()).
    subscribe( data => {
      this.user=data; 
    },err=>{console.log(err);});
    
    }

    getMilitant(){
      this.apiService.getById(this.url).
            subscribe((data: any)=>{
                          this.militant=data;
                          console.log(this.militant);
            }, err=>{
                console.log(err);
               } );
    }

    //inputString.charAt(0).toUpperCase() + inputString.slice(1);

     onSubmit(){
      console.log(this.formEdit.value);
      console.log(this.url);
      this.formEdit.value.nom=this.formEdit.value.nom.toUpperCase()
      this.formEdit.value.prenom=this.formEdit.value.prenom.charAt(0).toUpperCase()+ this.formEdit.value.prenom.slice(1);
      this.formEdit.value.subdivision=this.formEdit.value.subdivision.charAt(0).toUpperCase()+ this.formEdit.value.subdivision.slice(1);
      this.formEdit.value.comite=this.formEdit.value.comite.charAt(0).toUpperCase()+ this.formEdit.value.comite.slice(1);
      this.apiService.Update(this.militant._links.self.href, this.formEdit.value).
      subscribe( data => {
        console.log(data);
        //this.getMilitant();
        //alert("Compte de Mr/Mme  "+this.formEdit.value.nom+"  modifiée avec succès ");

       this.route.navigate(['users']);
       window.location.reload();
        }, err=>{
          console.log(err);
          alert("Il  existe deja un militant avec le meme numero de telephone : "+this.formEdit.value.telephone+
        "ou le meme numéro matricule : "+this.formEdit.value.matricule);
        });  
    }

}


