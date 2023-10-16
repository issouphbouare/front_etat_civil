import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';
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
    private apiService: DocumentService,private uploadService: FileUploadService,
    private  router:Router) { }
  active : boolean=true;
  idAv:number=0;
  fich: boolean=false;
  selectedFile: any;
  uploadSuccessMessage: string='';

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  stringArray: string[] = [];


  ngOnInit(): void {
    
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

      this.apiService .upload(this.currentFile, "A").subscribe(
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
