import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DivisionService } from 'src/app/services/division.service'; 
@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.css']
})
export class DivisionsComponent implements OnInit {

  public donnees:any;
  public coordination: any;
  //public base : string="http://localhost:8082/coordinations/";
 // public base="https://62.171.169.168:8082/coordinations/"; /*connexion au serveur distant*/
  public nbPage : number=0;
  public pages : Array<number>=[];
  public url: string='';


  constructor(private http: HttpClient,private route:ActivatedRoute,
    private apiService: DivisionService,
    private router : Router) { }

  ngOnInit(): void {
    this.url=this.route.snapshot.params['id']
    this.onGetByCoor();
    this.onGetCoor()
  }

  onGetByCoor(){
    this.apiService.getDivByCoor(this.url.toString())
    .subscribe((data: any)=>{
    
    this.donnees=data;

  }, err=>{
    console.log(err);
  })

  }

  onGetCoor(){
    this.apiService.getCoor(this.url.toString())
    .subscribe((data: any)=>{
    
    this.coordination=data;

  }, err=>{
    console.log(err);
  })

  }

  

  onDelete(m:any){
    if(confirm("Voulez-vous vraiment supprimer la coordination  "+m.nom+ " ?")){
      console.log();
      this.apiService.delete(m._links.self.href)
      .subscribe( data=>{
        this.onGetByCoor();
    
        }, err=>{
          console.log(err);
        }
      );

    alert("division "+m.nom+  " supprimé avec succes");
  }
    
  }


}


