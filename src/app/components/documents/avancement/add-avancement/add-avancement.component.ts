import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AvancementService } from 'src/app/services/avancement.service';
import { FileUploadService } from 'src/app/services/file-upload-service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-avancement',
  templateUrl: './add-avancement.component.html',
  styleUrls: ['./add-avancement.component.css']
})
export class AddAvancementComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private apiService: AvancementService,private uploadService: FileUploadService,
    private  router:Router) { }
  formAdd : FormGroup= new FormGroup({});
  active : boolean=true;
  idAv:number=0;
  selectedFile: any;
  uploadSuccessMessage: string='';

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  stringArray: string[] = [];


  ngOnInit(): void {
    this.formAdd=this.formBuilder.group({
      titre : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
      description : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
    });
    this.active=true; 
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
      this.active=false; //this.getId()
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
