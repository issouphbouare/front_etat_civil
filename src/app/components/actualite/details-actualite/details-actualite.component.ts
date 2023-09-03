import { Component } from '@angular/core';
import { Actualite } from 'src/app/models/actualite';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActualiteService } from 'src/app/services/actualite.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-details-actualite',
  templateUrl: './details-actualite.component.html',
  styleUrls: ['./details-actualite.component.css']
})
export class DetailsActualiteComponent {
  formEdit : FormGroup= new FormGroup({});
  public actualite : any;
  public imgCur:any;
  public images:any;
  public url: string='';
  public urlImage: string='';
  public urlImageTitre :string ='';
  public edit :boolean=false;
  public img : boolean=true;
  public titre : boolean=true;
  public idAc:number=0;
  stringArray: string[] = [];

  constructor(private apiService: ActualiteService,private formBuilder:FormBuilder,
    private router:ActivatedRoute,private uploadImageService: UploadImageService,
    private  route: Router) { }
    ngOnInit(): void {
    
      this.formEdit=this.formBuilder.group({
        titre : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
        contenu : ['',[Validators.required]],      });

       this.url=this.router.snapshot.params['id']
       this.getActualite();
       this.getId();
      
    this.urlImage=this.apiService.urlImage;
    this.urlImageTitre=this.apiService.urlImageTitre
    this.edit=false; this.img=true; this.titre=true;
    
     }  
   
     
    
    
     onGetImages(a : any){
      this.apiService.getImagesActualite(this.url).
          subscribe((data: any)=>{
                        this.images=data;
                        console.log(this.images);
          }, err=>{
              console.log(err);
             } 
      );

     } 

     onDelete(a: any){
      if(confirm("Voulez-vous vraiment supprimer l'actualité  "+a.titre+ " ?")){
        console.log();
        this.apiService.deleteActualite(a._links.self.href)
        .subscribe( data=>{
            this.getActualite();          
            this.route.navigate(['actualites']);
      
          }, err=>{
            console.log(err);
          }
        );
  
        alert("Actualité "+a.titre+  " supprimé avec succes");
      }
   }

   OnEdit(){
    this.edit=true;
   }

   OnUp(){
    this.img=false;
   }
   OnOut1(){this.titre=true}

   OnUp1(){
    this.titre=false;
   }
   OnOut(){this.img=true}

   OnReturn1(){
    this.route.navigate(['actualites']);
   }
   
   OnReturn(){
    //window.location.reload();
    this.edit=false
   }

   onSubmit(){
    console.log(this.formEdit.value);
    console.log(this.url);
    this.apiService.UpdateActualite(this.url, this.formEdit.value).
    subscribe( data => {
      console.log(data);
      alert(" Actualité  "+this.formEdit.value.titre+"  modifiée avec succès ");
      this.getActualite();
      window.location.reload();
      
      }, err=>{
        console.log(err);
        alert("Cette actualité existe deja !");
      });  
  }

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadTitre(): void {
    //this.progress = 0;
    if (this.selectedFile) {
      this.uploadImageService.editTitre(this.selectedFile, this.actualite.imageTitre.id).subscribe(
        (response: any) => {
          console.log('Upload successful:', response);
          alert("Image de titre Changé avec succès");
          this.getActualite();
          window.location.reload();
          if (response.type === HttpEventType.UploadProgress) {
            
          } else if (response instanceof HttpResponse) {
          }
        },
        error => {
          console.error('Upload error:', error);
          // Traitez les erreurs d'upload ici
        }
      ); this.selectedFile = null;
    }  
  }

  uploadIm(): void {
    if (this.selectedFile) {
      this.uploadImageService.uploadIm(this.selectedFile, (this.actualite.id).toString()).subscribe(
        (response: any) => {
          console.log('Upload successful:', response.message);
          alert("Image ajoutée avec succes");
          this.getActualite();
          window.location.reload();
          this.stringArray.push(response.message);
        },
        error => {
          console.error('Upload error:', error);
          // Traitez les erreurs d'upload ici
        }
      ); this.selectedFile = null;
    } //this.img=true; 
  }

  onDeleteImg(i :any): void {
    if(confirm("Voulez-vous vraiment supprimer l'actualité  "+i.titre+ " ?")){
      console.log();
      this.uploadImageService.delete(i._links.self.href)
      .subscribe( data=>{
          this.getActualite();          
          this.route.navigate(['actualites']);
    
        }, err=>{
          console.log(err);
        }
      );

      alert("Actualité "+i.name+" supprimé avec succes");
      this.getActualite();
      window.location.reload();
    }
  }


  getActualite(){
    this.apiService.getActualiteById(this.url).
          subscribe((data: any)=>{
                        this.actualite=data;
                        console.log(this.actualite);
                        this.onGetImages(data._links.images.href)
          }, err=>{
              console.log(err);
             } );
  }

  getId(){
    this.apiService.getMaxId().
    subscribe( (data:any) => { 
      this.idAc=data;
      console.log(data)
    },err=>{
      
    });
  }
}
