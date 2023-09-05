import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';
import { FileUploadService } from 'src/app/services/file-upload-service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-add-hierachisation',
  templateUrl: './add-hierachisation.component.html',
  styleUrls: ['./add-hierachisation.component.css']
})
export class AddHierachisationComponent {
  constructor(private formBuilder:FormBuilder,
    private apiService: DocumentService,private uploadService: FileUploadService,
    private  router:Router) { }
  formAdd : FormGroup= new FormGroup({});
  active : boolean=true;
  idAv:number=0;
  fich: boolean=false;
  selectedFile: any;
  uploadSuccessMessage: string='';

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  default: string="Hierachisation";
  stringArray: string[] = [];

  selectedValue: string='';
  options: { value: string, label: string }[] = [
    { value: '', label: '' },
    { value: 'Titularisation', label: 'Titularisation' },
    { value: 'Principalité', label: 'Principalité' }
    
  ];
  onSelectionChange() {
    // Cette fonction sera appelée lorsque la sélection change.
    console.log('Option sélectionnée :', this.selectedValue);
  }


  ngOnInit(): void {
    this.formAdd=this.formBuilder.group({
      titre : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
      description : ['',[Validators.required]],
      categorie : ['',[Validators.required, Validators.pattern("([a-zA-Z]).{2,}")]],
      type : ['',[Validators.required]],
    });
    this.fich=false; 
    this.getId();
  }

  

  onSubmit(){ 
    console.log(this.formAdd.value);
    this.apiService.Create(this.formAdd.value).
    subscribe( (data:any) => {
         
        //this.router.navigate(['avancements']);
      },err=>{
        console.log(err);
        //alert("Cette matiere existe deja !");
      });
      this.fich=true; //this.getId()
      this.idAv+=1;

}

getId(){
  this.apiService.getMaxId().
  subscribe( (data:any) => { 
    this.idAv=data;
    console.log(data)
  },err=>{
    
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

      this.uploadService .upload(this.currentFile, (this.idAv).toString()).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.stringArray.push(this.message);
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        });

    }

    this.selectedFiles = undefined;
  }
}


}

