import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CercleService } from 'src/app/services/cercle.service';
import { RegionService } from 'src/app/services/region.service';
@Component({
  selector: 'app-cercles',
  templateUrl: './cercles.component.html',
  styleUrls: ['./cercles.component.css']
})
export class CerclesComponent implements OnInit {

  public donnees:any;
  public region: any;
  //public base : string="http://localhost:8082/coordinations/";
 // public base="https://62.171.169.168:8082/coordinations/"; /*connexion au serveur distant*/
  public nbPage : number=0;
  public pages : Array<number>=[];
  public url: string='';


  constructor(private http: HttpClient,private route:ActivatedRoute,
    private apiService: CercleService,private regionService: RegionService,
    private router : Router) { }

  ngOnInit(): void {
    this.url=this.route.snapshot.params['id']
    this.onGetByReg();
    this.onGetReg()
  }

  onGetByReg(){
    this.apiService.getCerByReg(this.url)
    .subscribe((data: any)=>{
    
    this.donnees=data;
    this.sortCercles();

  }, err=>{
    console.log(err);
  })

  }

  onGetReg(){
    this.regionService.getById(this.url.toString())
    .subscribe((data: any)=>{
    
    this.region=data;

  }, err=>{
    console.log(err);
  })

  }

  

  onDelete(m:any){
    if(confirm("Voulez-vous vraiment supprimer le cercle  "+m.nom+ " ?")){
      console.log();
      this.apiService.delete(m.id)
      .subscribe( data=>{
        this.onGetByReg();
    
        }, err=>{
          console.log(err);
        }
      );

    alert("cercle "+m.nom+  " supprimé avec succes");
  }
    
  }
  sortCercles(): void{
    this.donnees.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
   }

}



