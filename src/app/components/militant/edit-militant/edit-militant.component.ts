import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/services/document.service';
import { FileUploadService } from 'src/app/services/file-upload-service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MilitantService } from 'src/app/services/militant.service';
@Component({
  selector: 'app-edit-militant',
  templateUrl: './edit-militant.component.html',
  styleUrls: ['./edit-militant.component.css']
})
export class EditMilitantComponent {
  formEdit : FormGroup= new FormGroup({});
  public militant : any;
  public url: string='';
  

  constructor(private apiService: MilitantService,private formBuilder:FormBuilder,
    private router:ActivatedRoute,private uploadService: FileUploadService,
    private  route: Router) { }

    selectedPoste: string='';
  optionPoste: { value: string, label: string }[] = [
    { value: '', label: '' },
    { value: 'Militant', label: 'Militant' },
    { value: 'Sécretaire Général', label: 'Sécretaire Général' },
    { value: "Sécretaire de Coordination", label: "Sécretaire de Coordination" },
    { value: 'Sécretaire de Division', label: 'Sécretaire de Division' },
    { value: 'Sécretaire de Subdivision', label: 'Sécretaire de Subdivision' },
    { value: 'Sécretaire de Comité', label: 'Sécretaire de Comité' },    
  ];
  onSelectionPoste() {
    // Cette fonction sera appelée lorsque la sélection change.
    console.log('Option sélectionnée :', this.selectedPoste);
  }

  selectedStatut: string='';
  optionStatut: { value: string, label: string }[] = [
    { value: '', label: '' },
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
      comite : ['',Validators.required],
      subdivision : ['',Validators.required],
      division : ['',Validators.required],
      motDePasse : ['',Validators.required],
      poste : ['',Validators.required],
      coordination : ['',Validators.required],
      genre : ['',Validators.required],
      statut : ['',Validators.required]
    });

     this.url=this.router.snapshot.params['id']
     this.getMilitant();
    
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

    

     onSubmit(){
      console.log(this.formEdit.value);
      console.log(this.url);
      this.apiService.Update(this.militant._links.self.href, this.formEdit.value).
      subscribe( data => {
        console.log(data);
        //this.getMilitant();
        //alert("Compte de Mr/Mme  "+this.formEdit.value.nom+"  modifiée avec succès ");

       this.route.navigate(['militants']);
        
        }, err=>{
          console.log(err);
          alert("Cette formation existe deja !");
        });  
    }

}


