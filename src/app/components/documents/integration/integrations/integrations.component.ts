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
  public integrations: any;
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
    this.urlDownload=this.apiService.urlDownload+"I/";
    
    //this.telephone=this.authService.loggedMilitant;
    this.authService.getCon(this.authService.loggedMilitant.toString()).
  subscribe( data => {
    this.user=data; 
  },err=>{console.log(err);});
    
  }

  search() {
    this.apiService.searchIntegration(this.keyword).subscribe(
      (data :any) => {
        this.integrations = data.content;
        console.log(data)
      },
      (error) => {
        console.error('Une erreur est survenue:', error);
      }
    );
  }
  
  onDelete(a: any){
    if(confirm("Voulez-vous vraiment supprimer ce document ?")){
      console.log();
      this.apiService.delete("/fileIs/"+a)
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

