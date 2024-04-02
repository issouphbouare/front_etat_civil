import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CitoyenService } from 'src/app/services/citoyen.service';
@Component({
  selector: 'app-citoyens',
  templateUrl: './citoyens.component.html',
  styleUrls: ['./citoyens.component.css']
})
export class CitoyensComponent {
public citoyens: any;
public av=1;
keyword: string = '';
urlDownload: string='';
idAv: number =0;
totalSearch:number=0;
public currentPage: number=0;
  public size : number=5;
  public nbPage : number=0;
  public pages : Array<number>=[];


constructor(private http: HttpClient,
  private apiService: CitoyenService,
  private router : Router) { }


ngOnInit(): void {
  this.av=1;
  this.onGetCitoyens();
  

  
  
}

onGetCitoyens() {
  this.apiService.getCitoyens()
    .subscribe((data: any) => { // Utilisez un type générique 'any' pour 'data'
      //this.nbPage = data.page.totalPages;
      //this.pages = new Array<number>(this.nbPage);
      this.citoyens = data;
      console.log(this.citoyens)

    }, err => {
      console.log(err);
    });
}

search() {
  this.apiService.getCitoyens().subscribe(
    (data :any) => {
      this.citoyens = data;
      
    },
    (error) => {
      console.error('Une erreur est survenue:', error);
    }
  );
}




goToPage(i:any){
  this.currentPage=i;
  this.onGetCitoyens();
}
onDelete(a: any){
  if(confirm("Voulez-vous vraiment supprimer ce compte ?")){
    console.log();
    this.apiService.delete(a)
    .subscribe( data=>{
      this.search();
      window.location.reload();
  
      }, err=>{
        console.log(err);
      }
    );

  //alert("Militant  supprimé avec succes");
}
  
}



}







