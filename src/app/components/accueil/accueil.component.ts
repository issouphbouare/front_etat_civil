import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 
import { Location } from '@angular/common'; 
import { ActualiteService } from 'src/app/services/actualite.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  public actualites:any;
  public urlImageTitre : string ='';
  public currentPage: number=0;
  public size : number=5;
  public nbPage : number=0;
  public pages : Array<number>=[];
  contentVisible = false;

  constructor(private http: HttpClient, private location: Location,
    private apiService: ActualiteService,public authService : AuthService,
    private router : Router) { }
  
    ngOnInit(): void {
      this.urlImageTitre=this.apiService.urlImageTitre
      this.onGetAllActualite();
      this.contentVisible = false;
    }

  toggleContent() {
    this.contentVisible = !this.contentVisible;
    this.location.go(this.location.path());
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

}
