import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';
import { MilitantService } from 'src/app/services/militant.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-militants',
  templateUrl: './militants.component.html',
  styleUrls: ['./militants.component.css']
})
export class MilitantsComponent {
  public url: string= "http://localhost:8082/login/";
  public user:any;
  public militants: any;
  public files : any;
  public av=1;
  keyword: string = '';
  urlDownload: string='';
  idAv: number =0;
  totalSearch:number=0;

  constructor(private http: HttpClient,private authService: AuthService,
    private apiService: MilitantService,
    private router : Router) { }


  ngOnInit(): void {
    this.av=1;
    this.search();
    this.getTotalSearch();
    this.getMaxId();

    this.authService.getCon(this.url+this.authService.loggedMilitant).
    subscribe( data => {
      this.user=data; 
    },err=>{console.log(err);});
    
  }

  search() {
    this.apiService.search(this.keyword).subscribe(
      (data :any) => {
        this.militants = data.content;
        this.getTotalSearch();
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

  getTotalSearch(){
    this.apiService.getTotalSearch(this.keyword).subscribe(
      (data :any) => {
        this.totalSearch = data;
      },
      (error) => {
        console.error('Une erreur est survenue:', error);
      }
    );
  }
  

  

 


  
  

  

  onDelete(a: any){
    if(confirm("Voulez-vous vraiment supprimer ce compte ?")){
      console.log();
      this.apiService.delete(a)
      .subscribe( data=>{
        this.search();
    
        }, err=>{
          console.log(err);
        }
      );

    alert("Militant  supprimé avec succes");
  }
    
  }
  onRetour(){
    this.av=1;
  }

}






