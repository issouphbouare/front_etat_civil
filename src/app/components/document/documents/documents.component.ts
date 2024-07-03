import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {public donnees: any;
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
    private apiService: DocumentService
    ,
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
    if(confirm("Voulez-vous vraiment supprimer ce document ?")){
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
    this.apiService.search(this.keyword, this.currentPage, this.size)
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
