import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent {
  public user:any;
  public integrations: any;
  public files : any;
  public av=1;
  keyword: string = '';
  urlDownload: string='';
  idAv: number =0;

  constructor(private http: HttpClient, private authService: AuthService,
    private apiService: DocumentService,
    private router : Router) { }


  ngOnInit(): void {
    this.av=1;
    this.search();
    this.urlDownload=this.apiService.urlDownload;
    this.getMaxId();

    this.authService.getCon(this.authService.loggedMilitant.toString()).
  subscribe( data => {
    this.user=data; 
  },err=>{console.log(err);});
    
  }

  search() {
    this.apiService.searchIntegration(this.keyword).subscribe(
      (data :any) => {
        this.integrations = data.content;
      },
      (error) => {
        console.error('Une erreur est survenue:', error);
      }
    );
  }
  getMaxId(){
    this.apiService.getMaxId().
    subscribe( (data:any) => { 
      this.idAv=data;
      console.log(data)
    },err=>{
      
    });
  }


  

  

 

  onGetFile(url :any){
    this.av=0;
    console.log(url);
    this.apiService.getFile(url)
    .subscribe((data: any) => { // Utilisez un type générique 'any' pour 'data'
      this.files = data;
      console.log(this.files);
    }, err => {
      console.log(err);
    });

  }

  
  

  

  onDelete(a: any){
    if(confirm("Voulez-vous vraiment supprimer ce document ?")){
      console.log();
      this.apiService.delete(a)
      .subscribe( data=>{
        this.search();
    
        }, err=>{
          console.log(err);
        }
      );

    alert("Document  supprimé avec succes");
  }
    
  }
  onRetour(){
    this.av=1;
  }

}





