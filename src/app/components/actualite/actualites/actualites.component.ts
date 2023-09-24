import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Actualite } from 'src/app/models/actualite';
import { ActualiteService } from 'src/app/services/actualite.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css']
})
export class ActualitesComponent {
  public user:any;
  
  public urlImageTitre : string ='';
  public urlNoImage : string='';
  public actualites: any;
  public currentPage: number=0;
  public size : number=5;
  public nbPage : number=0;
  public pages : Array<number>=[];

  showFullText = false;
  longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ..."; // Votre long paragraphe



  constructor(private http: HttpClient, private authService: AuthService,
    private apiService: ActualiteService,
    private router : Router) { }

  ngOnInit(): void {
    this.urlImageTitre=this.apiService.urlImageTitre
    this.onGetAllActualite();

    this.authService.getCon(this.authService.loggedMilitant.toString()).
    subscribe( data => {
      this.user=data; 
    },err=>{console.log(err);});
    
  }

  onGetAllActualite() {
    this.apiService.getActualites(this.currentPage, this.size)
      .subscribe((data: any) => { // Utilisez un type générique 'any' pour 'data'
        this.nbPage = data.page.totalPages;
        this.pages = new Array<number>(this.nbPage);
        this.actualites = data;
        console.log(this.actualites)
  
      }, err => {
        console.log(err);
      });
  }
  onGetImg(a:any){
    console.log("abibi");
  }

  goToPage(i:any){
    this.currentPage=i;
    this.onGetAllActualite();
  }

  onDelete(a: any){
    if(confirm("Voulez-vous vraiment supprimer l'actualite  "+a.titre+ " ?")){
      console.log();
      this.apiService.deleteActualite(a._links.self.href)
      .subscribe( data=>{
        this.onGetAllActualite();
    
        }, err=>{
          console.log(err);
        }
      );

    alert("Actualite "+a.titre+  " supprimé avec succes");
  }
    
  }

}
