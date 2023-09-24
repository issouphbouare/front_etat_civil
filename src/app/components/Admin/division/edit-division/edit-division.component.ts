import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DivisionService } from 'src/app/services/division.service'; 
import { CoordinationService } from 'src/app/services/coordination.service';
@Component({
  selector: 'app-edit-division',
  templateUrl: './edit-division.component.html',
  styleUrls: ['./edit-division.component.css']
})
export class EditDivisionComponent implements OnInit {

  public donnee:any;
  public coordination: any;
  public coordinations: any;
  //public base : string="http://localhost:8082/divisions/";
  public base="http://62.171.169.168:8082/divisions/"; /*connexion au serveur distant*/
  public nbPage : number=0;
  public pages : Array<number>=[];
  public url: string='';
  formEdit : FormGroup= new FormGroup({});



  constructor(private http: HttpClient,private route:ActivatedRoute,
    private apiService: DivisionService, private formBuilder:FormBuilder ,
    private router : Router, private coordinationService: CoordinationService) { }

  ngOnInit(): void {
    this.formEdit=this.formBuilder.group({
      nom : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
      coordination : ['',[Validators.required]]
    });
    this.url=this.route.snapshot.params['id']
    this.onGetDiv();
    
    this.onGetAllCoor();
  }

  onGetDiv(){
    this.apiService.getById(this.url)
    .subscribe((data: any)=>{
    
    this.donnee=data;
    this.onGetCoor(this.donnee._links.coordination.href)

  }, err=>{
    console.log(err);
  })

  }

  onGetCoor(c:any){
    this.apiService.getCoor(c)
    .subscribe((data: any)=>{
    
    this.coordination=data;

  }, err=>{
    console.log(err);
  })

  }

  onGetAllCoor(){
    this.coordinationService.getCoordinations()
    .subscribe((data: any)=>{
    
    this.coordinations=data;

  }, err=>{
    console.log(err);
  })

  }

  
  onSubmit(){
    console.log(this.formEdit.value);
    console.log(this.url);
    this.apiService.Update(this.base+this.donnee.id, this.formEdit.value).
    subscribe( (data: any) => {
      console.log(data);
      alert(" Division  "+this.formEdit.value.nom+"  modifiee avec succes ");
      this.router.navigate(['divisions', this.coordination.id]);
      }, err=>{
        console.log(err);
        alert("Cette division existe deja !");
      });  
 
  }
 


}



