import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegionService } from 'src/app/services/region.service';
@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent {
  public donnees:any;
  public currentPage: number=0;
  public size : number=6;
  public nbPage : number=0;
  public pages : Array<number>=[];


  constructor(private http: HttpClient,
    private apiService: RegionService,
    private router : Router) { }

  ngOnInit(): void {
    this.onGetAll();
  }

  onGetAll(){
    this.apiService.getRegions()
    .subscribe((data: any)=>{
    /* this.nbPage=data["page"].totalPages;
    this.pages=new Array<number>(this.nbPage); */
    this.donnees=data;
    this.sortRegions();

  }, err=>{
    console.log(err);
  })

  }

  // goToPage(i: any){
  //   this.currentPage=i;
  //   this.onGetAll();
  // }

  onDelete(m:any){
    if(confirm("Voulez-vous vraiment supprimer la region  "+m.nom+ " ?")){
      console.log();
      this.apiService.delete(m.id.toString())
      .subscribe( data=>{
        this.onGetAll();
    
        }, err=>{
          console.log(err);
        }
      );

    alert("Region "+m.nom+  " supprimé avec succes");
  }
    
  }
  sortRegions(): void{
    this.donnees.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
   }

}


