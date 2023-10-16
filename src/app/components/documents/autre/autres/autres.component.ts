import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-autres',
  templateUrl: './autres.component.html',
  styleUrls: ['./autres.component.css']
})
export class AutresComponent {
  public autres: any;
  public files : any;
  keyword: string = '';
  urlDownload: string='';
  idAv: number =0;
  user:any ;

  constructor(private http: HttpClient, private authService: AuthService,
    private apiService: DocumentService,
    private router : Router) { }


  ngOnInit(): void {
   
    this.search();
    this.urlDownload=this.apiService.urlDownload+"Autre/";
    
    //this.telephone=this.authService.loggedMilitant;
    this.authService.getCon(this.authService.loggedMilitant.toString()).
  subscribe( data => {
    this.user=data; 
  },err=>{console.log(err);});
    
  }

  search() {
    this.apiService.searchAutre(this.keyword).subscribe(
      (data :any) => {
        this.autres = data.content;
      },
      (error) => {
        console.error('Une erreur est survenue:', error);
      }
    );
  }
  
  onDelete(a: any){
    if(confirm("Voulez-vous vraiment supprimer ce document ?")){
      console.log();
      this.apiService.delete("/fileAutres/"+a)
      .subscribe( data=>{
        this.search();
    
        }, err=>{
          console.log(err);
        }
      );

    alert("Document  supprimé avec succes");
  }
    
  }
  

}

