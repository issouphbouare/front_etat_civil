import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommuneService } from 'src/app/services/commune.service';

@Component({
  selector: 'app-payes',
  templateUrl: './payes.component.html',
  styleUrls: ['./payes.component.css']
})
export class PayesComponent implements OnInit {

  public donnees: any;
  public av=1;
  keyword: string = '';
  urlDownload: string='';
  idAv: number =0;
  totalSearch:number=0;
  public currentPage: number=0;
    public size : number=6;
    public nbPage : number=0;
    public pages : Array<number>=[];
  
  
  constructor(private http: HttpClient,
    private apiService: CommuneService,
    private router : Router) { }
  
  
  ngOnInit(): void {
    this.av=1;
    this.onSearch() 
  }
  
  
  goToPage(i:any){
    this.currentPage=i;
    this.onSearch();
  }
  goToPrevious(){
    this.currentPage=this.currentPage-1;
    this.onSearch();
  }
  goToNext(){
    this.currentPage=this.currentPage+1;
    this.onSearch();
  }
  search(){
    this.currentPage=0;
    this.onSearch();
  }
  onDelete(a: any){
    if(confirm("Voulez-vous vraiment supprimer ce citoyen ?")){
      console.log();
      this.apiService.delete(a)
      .subscribe( data=>{
        this.onSearch();
        window.location.reload();
    
        }, err=>{
          console.log(err);
        }
      );
  
    //alert("Militant  supprimé avec succes");
  }
    
  }
  
  onSearch() {
    this.apiService.searchP(this.keyword, this.currentPage, this.size)
      .subscribe((data: any) => { // Utilisez un type générique 'any' pour 'data'
        this.nbPage = data.totalPages;
        this.totalSearch=data.totalElements;
        this.pages = new Array<number>(this.nbPage);
        this.donnees = data.content;
        console.log(this.donnees)
      }, err => {
        console.log(err);
      });
  }
}
