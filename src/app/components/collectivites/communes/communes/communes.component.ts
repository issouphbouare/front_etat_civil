import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CercleService } from 'src/app/services/cercle.service';
import { CommuneService } from 'src/app/services/commune.service';
import { RegionService } from 'src/app/services/region.service';
@Component({
  selector: 'app-communes',
  templateUrl: './communes.component.html',
  styleUrls: ['./communes.component.css']
})
export class CommunesComponent implements OnInit {

  public donnees:any;
  public cercle: any;
  public region: any;
  //public base : string="http://localhost:8082/coordinations/";
 // public base="https://62.171.169.168:8082/coordinations/"; /*connexion au serveur distant*/
  public nbPage : number=0;
  public pages : Array<number>=[];
  public url: string='';


  constructor(private http: HttpClient,private route:ActivatedRoute,
    private apiService: CommuneService,private cercleService: CercleService,
    private regionService: RegionService,private router : Router) { }

  ngOnInit(): void {
    this.url=this.route.snapshot.params['id']
    this.onGetByCer();
    this.onGetCer()
  }

  onGetByCer(){
    this.apiService.getComByCer(this.url)
    .subscribe((data: any)=>{
    
    this.donnees=data;
    this.sortCommunes();

  }, err=>{
    console.log(err);
  })

  }

  onGetCer(){
    this.cercleService.getById(this.url)
    .subscribe((data: any)=>{
    
    this.cercle=data;
    this.onGetReg(this.cercle.region)

  }, err=>{
    console.log(err);
  })

  }

  onGetReg(c: any){
    this.regionService.getById(c.toString())
    .subscribe((data: any)=>{
    
    this.region=data;

  }, err=>{
    console.log(err);
  })

  }

  

  onDelete(m:any){
    if(confirm("Voulez-vous vraiment supprimer la commune  "+m.nom+ " ?")){
      console.log();
      this.apiService.delete(m.id)
      .subscribe( data=>{
        this.onGetByCer();
    
        }, err=>{
          console.log(err);
        }
      );

    alert("commune "+m.nom+  " supprimé avec succes");
  }
    
  }

  sortCommunes(): void{
    this.donnees.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
   }
}




