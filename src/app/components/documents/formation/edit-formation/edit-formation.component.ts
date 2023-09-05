import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/services/document.service';
import { FileUploadService } from 'src/app/services/file-upload-service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.css']
})
export class EditFormationComponent {
  formEdit : FormGroup= new FormGroup({});
  public formation : any;
  public fileCur:any;
  public files:any;
  public url: string='';
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  public fich:boolean=true;

  constructor(private apiService: DocumentService,private formBuilder:FormBuilder,
    private router:ActivatedRoute,private uploadService: FileUploadService,
    private  route: Router) { }

    selectedValue: string='';
  options: { value: string, label: string }[] = [
    { value: '', label: '' },
    { value: 'Autorisation', label: 'Autorisation' },
    { value: 'Conge_de_formation', label: 'Conge_de_formation' },
    { value: 'Reaffectation_apres_formation', label: 'Reaffectation_apres_formation_apres_formation' },
    { value: 'Regularisation_apres_formation', label: 'Regularisation_apres_formation' },    
  ];
  onSelectionChange() {
    // Cette fonction sera appelée lorsque la sélection change.
    console.log('Option sélectionnée :', this.selectedValue);
  }

  ngOnInit(): void {
    
    this.formEdit=this.formBuilder.group({
      titre : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
      description : ['',[Validators.required]],
      categorie : ['',[Validators.required, Validators.pattern("([a-zA-Z]).{2,}")]],
      type : ['',[Validators.required]],
    });

     this.url=this.router.snapshot.params['id']
     this.getFormation();
     this.fich=true;
    }

    getFormation(){
      this.apiService.getById(this.url).
            subscribe((data: any)=>{
                          this.formation=data;
                          console.log(this.formation);
                          this.onGetFiles(data.id);
            }, err=>{
                console.log(err);
               } );
    }

    onGetFiles(a : any){
      this.apiService.getFile(this.url).
          subscribe((data: any)=>{
                        this.files=data;
                        console.log(this.files);
          }, err=>{
              console.log(err);
             } 
      );

     } 

     onSubmit(){
      console.log(this.formEdit.value);
      console.log(this.url);
      this.apiService.Update(this.formation._links.self.href, this.formEdit.value).
      subscribe( data => {
        console.log(data);
        alert("   "+this.formEdit.value.titre+"  modifiée avec succès ");
        this.getFormation();
       // this.route.navigate(['avancements']);
        //window.location.reload();
        
        }, err=>{
          console.log(err);
          alert("Cette formation existe deja !");
        });  
    }

    selectFile(event: any): void {
      this.selectedFiles = event.target.files;
    }
    
    upload(): void {
      this.progress = 0;
    
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
    
        if (file) {
          this.currentFile = file;
    
          this.uploadService.upload(this.currentFile, (this.formation.id).toString()).subscribe(
            (event: any) => {
              
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
                //alert("Fichier ajouté avec succès ");
                //this.route.navigate(['actualites']);
                //this.onGetFiles(this.avancement.id);
               // window.location.reload();
               this.getFormation();
              } else if (event instanceof HttpResponse) {
                //this.message = event.body.message;
                //this.stringArray.push(this.message);
              }
            },
            (err: any) => {
              console.log(err);
              this.progress = 0;
    
              if (err.error && err.error.message) {
               // this.message = err.error.message;
              } else {
                //this.message = 'Could not upload the file!';
              }
    
              this.currentFile = undefined;
            });
    
        }
    
        this.selectedFiles = undefined;
      }
    }

    onDeleteFille(f :any): void {
      if(confirm("Voulez-vous vraiment supprimer le fichier  "+f.name+ " ?")){
        console.log();
        this.apiService.deleteFile(f._links.self.href)
        .subscribe( data=>{
            this.onGetFiles(this.formation.id);          
            //this.route.navigate(['actualites']);
      
          }, err=>{
            console.log(err);
          }
        );
  
        alert("Fichier "+f.name+" supprimé avec succès");
        this.onGetFiles(this.formation.id);
        //window.location.reload();
      }
    }

    OnUp(){
      this.fich=false;
    }

    OnOut(){
      this.fich=true;
      this.getFormation()
    }

}

