import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CercleService } from 'src/app/services/cercle.service';
import { CommuneService } from 'src/app/services/commune.service';
import { VqfService } from 'src/app/services/vqf.service';
@Component({
  selector: 'app-vqfs',
  templateUrl: './vqfs.component.html',
  styleUrls: ['./vqfs.component.css']
})
export class VqfsComponent implements OnInit {

  public donnees:any;
  public cercle: any;
  public commune: any;
  //public base : string="http://localhost:8082/coordinations/";
 // public base="https://62.171.169.168:8082/coordinations/"; /*connexion au serveur distant*/
  public nbPage : number=0;
  public pages : Array<number>=[];
  public url: string='';


  constructor(private http: HttpClient,private route:ActivatedRoute,
    private apiService: VqfService,private communeService: CommuneService,
    private cercleService: CercleService,private router : Router) { }

  ngOnInit(): void {
    this.url=this.route.snapshot.params['id']
    this.onGetByCom();
    this.onGetCom()
  }

  onGetByCom(){
    this.apiService.getVqfByCom(this.url.toString())
    .subscribe((data: any)=>{
    
    this.donnees=data;
    this.sortVqfs();

  }, err=>{
    console.log(err);
  })

  }

  onGetCom(){
    this.communeService.getById(this.url.toString())
    .subscribe((data: any)=>{
    
    this.commune=data;
    this.onGetCer(this.commune.cercle)

  }, err=>{
    console.log(err);
  })

  }

  onGetCer(c: any){
    this.cercleService.getById(c.toString())
    .subscribe((data: any)=>{
    
    this.cercle=data;

  }, err=>{
    console.log(err);
  })

  }

  

  onDelete(m:any){
    if(confirm("Voulez-vous vraiment supprimer la vqf  "+m.nom+ " ?")){
      console.log();
      this.apiService.delete(m.id)
      .subscribe( data=>{
        this.onGetByCom();
    
        }, err=>{
          console.log(err);
        }
      );

    alert("vqf "+m.nom+  " supprimé avec succes");
  }
    
  }

  sortVqfs(): void{
    this.donnees.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
   }


}




