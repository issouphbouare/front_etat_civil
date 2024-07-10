import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegionService } from 'src/app/services/region.service';
@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent {
public import: boolean=false;
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
  private apiService: RegionService
  ,
  private router : Router) { }


ngOnInit(): void {
  this.import=false
  this.av=1;
  this.onSearch() 
}

onImport(){
  this.import=true;
}
onNotImport(){
  this.import=false;
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
  if(confirm("Voulez-vous vraiment supprimer cette region ?")){
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

// Importation du fichier.txt 
selectedFile!: File;
onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0] as File;
}

onUpload(): void {
  if (this.selectedFile) {
    this.apiService.Importer(this.selectedFile).subscribe(
      response => {
        console.log('Importation réussie', response);
        // Gérer la réponse ici (par exemple, afficher un message à l'utilisateur)
      },
      error => {
        alert("Fichier importé avec succès ")
        console.error('Erreur lors de l\'importation du fichier', error.err);
        // Gérer l'erreur ici (par exemple, afficher un message d'erreur à l'utilisateur)
      }
    );
  } 
  this.onSearch();
  window.location.reload();
}
}