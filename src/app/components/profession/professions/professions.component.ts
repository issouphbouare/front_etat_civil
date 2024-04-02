import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfessionService } from 'src/app/services/profession.service';
@Component({
  selector: 'app-professions',
  templateUrl: './professions.component.html',
  styleUrls: ['./professions.component.css']
})
export class ProfessionsComponent {
  public donnees:any;
  public currentPage: number=0;
  public size : number=6;
  public nbPage : number=0;
  public pages : Array<number>=[];


  constructor(private http: HttpClient,
    private apiService: ProfessionService,
    private router : Router) { }

  ngOnInit(): void {
    this.onGetAll();
  }

  onGetAll(){
    this.apiService.getProfessions()
    .subscribe((data: any)=>{
    /* this.nbPage=data["page"].totalPages;
    this.pages=new Array<number>(this.nbPage); */
    this.donnees=data;
    this.sortProfessions();

  }, err=>{
    console.log(err);
  })

  }

  // goToPage(i: any){
  //   this.currentPage=i;
  //   this.onGetAll();
  // }

  onDelete(m:any){
    if(confirm("Voulez-vous vraiment supprimer la profession  "+m.libelle+ " ?")){
      console.log();
      this.apiService.delete(m.id.toString())
      .subscribe( data=>{
        this.onGetAll();
    
        }, err=>{
          console.log(err);
        }
      );

    alert("Profession "+m.libelle+  " supprimé avec succes");
  }
    
  }
  sortProfessions(): void{
    this.donnees.sort((a: any, b: any) => {
      return a.libelle.localeCompare(b.libelle)
    })
   }

}



