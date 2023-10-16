import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CoordinationService } from 'src/app/services/coordination.service'; 
@Component({
  selector: 'app-coordinations',
  templateUrl: './coordinations.component.html',
  styleUrls: ['./coordinations.component.css']
})
export class CoordinationsComponent implements OnInit {

  public donnees:any;
  public currentPage: number=0;
  public size : number=6;
  public nbPage : number=0;
  public pages : Array<number>=[];


  constructor(private http: HttpClient,
    private apiService: CoordinationService,
    private router : Router) { }

  ngOnInit(): void {
    this.onGetAll();
  }

  onGetAll(){
    this.apiService.getAll(this.currentPage, this.size)
    .subscribe((data: any)=>{
    this.nbPage=data["page"].totalPages;
    this.pages=new Array<number>(this.nbPage);
    this.donnees=data;

  }, err=>{
    console.log(err);
  })

  }

  goToPage(i: any){
    this.currentPage=i;
    this.onGetAll();
  }

  onDelete(m:any){
    if(confirm("Voulez-vous vraiment supprimer la coordination  "+m.nom+ " ?")){
      console.log();
      this.apiService.delete(m.id.toString())
      .subscribe( data=>{
        this.onGetAll();
    
        }, err=>{
          console.log(err);
        }
      );

    alert("Coordination "+m.nom+  " supprimé avec succes");
  }
    
  }


}

