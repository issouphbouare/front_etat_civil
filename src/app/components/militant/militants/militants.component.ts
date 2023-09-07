import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';
import { MilitantService } from 'src/app/services/militant.service';
@Component({
  selector: 'app-militants',
  templateUrl: './militants.component.html',
  styleUrls: ['./militants.component.css']
})
export class MilitantsComponent {
  public militants: any;
  public files : any;
  public av=1;
  keyword: string = '';
  urlDownload: string='';
  idAv: number =0;

  constructor(private http: HttpClient,
    private apiService: MilitantService,
    private router : Router) { }


  ngOnInit(): void {
    this.av=1;
    this.search();
    this.getMaxId();
    
  }

  search() {
    this.apiService.search(this.keyword).subscribe(
      (data :any) => {
        this.militants = data.content;
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

    alert("Militant  supprimé avec succes");
  }
    
  }
  onRetour(){
    this.av=1;
  }

}






