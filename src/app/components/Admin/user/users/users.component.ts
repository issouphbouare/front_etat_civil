import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  public donnees:any;
  public currentPage: number=0;
  public size : number=6;
  public nbPage : number=0;
  public pages : Array<number>=[];


  constructor(private http: HttpClient,
    private apiService: UserService,
    private router : Router) { }

  ngOnInit(): void {
    this.onGetAll();
  }

  onGetAll(){
    this.apiService.getUsers()
    .subscribe((data: any)=>{
    //this.nbPage=data["page"].totalPages;
    //this.pages=new Array<number>(this.nbPage);
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
    if(confirm("Voulez-vous vraiment supprimer la region  "+m.nom+ " ?")){
      console.log();
      this.apiService.delete(m.id.toString())
      .subscribe( data=>{
        this.onGetAll();
    
        }, err=>{
          console.log(err);
        }
      );

    alert("Region "+m.nom+  " supprimé avec succes");
  }
    
  }


}

