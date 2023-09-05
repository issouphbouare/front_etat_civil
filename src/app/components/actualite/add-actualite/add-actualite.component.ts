import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload-service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActualiteService } from 'src/app/services/actualite.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-add-actualite',
  templateUrl: './add-actualite.component.html',
  styleUrls: ['./add-actualite.component.css']
})
export class AddActualiteComponent {
  constructor(private formBuilder:FormBuilder, private uploadImageService: UploadImageService,
    private apiService: ActualiteService,private uploadService: FileUploadService,
    private  router:Router) { }
  formAdd : FormGroup= new FormGroup({});
  titre : boolean=true;
  img : boolean=true;
  etape1 : boolean=true;
  idAv:number=0;
  //selectedFile: any;
  

  selectedFiles: any;
  currentFile: any;
  progress = 0;
  message = '';
  stringArray: string[] = [];


  ngOnInit(): void {
    this.formAdd=this.formBuilder.group({
      titre : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
      contenu : ['',[Validators.required]],
    });
    this.titre=false; 
    this.img=false;
     this.etape1=true;
     this.stringArray=[];
    this.getId();
  }

  

  onSubmit(){ 
    console.log(this.formAdd.value);
    this.apiService.CreateActualite(this.formAdd.value).
    subscribe( (data:any) => {
         
        //this.router.navigate(['avancements']);
      },err=>{
        console.log(err);
        //alert("Cette matiere existe deja !");
      });
      this.titre=true; this.img=false; //this.getId()
      //this.etape1=false;
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



selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadTitre(): void {
    this.progress = 0;
    if (this.selectedFile) {
      this.uploadImageService.uploadTitre(this.selectedFile, (this.idAv).toString()).subscribe(
        (response: any) => {
          console.log('Upload successful:', response);
          this.message = response.message;          
          if (response.type === HttpEventType.UploadProgress) {
            
          } else if (response instanceof HttpResponse) {
            //this.message = response.body.message;
            //this.stringArray.push(this.message);
          }
        },
        error => {
          console.error('Upload error:', error);
          // Traitez les erreurs d'upload ici
        }
      ); this.selectedFile = null;
    } this.img=true; this.titre=false;
  }

  uploadIm(): void {
    this.progress = 0;
    if (this.selectedFile) {
      this.uploadImageService.uploadIm(this.selectedFile, (this.idAv).toString()).subscribe(
        (response: any) => {
          console.log('Upload successful:', response.message);
          // Traitez la réponse du serveur si nécessaire
          //this.message = response.body.message;
          this.stringArray.push(response.message);
          if (response.type === HttpEventType.UploadProgress) {
          } else if (response instanceof HttpResponse) {
            //this.message = response.body.message;
            //this.stringArray.push(this.message);
          }
        },
        error => {
          console.error('Upload error:', error);
          // Traitez les erreurs d'upload ici
        }
      ); this.selectedFile = null;
    } this.img=true; 
  }
  
  goToEtape3(){
    this.titre=false; this.img=true;
  }

}
