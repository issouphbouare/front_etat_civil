import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CercleService } from 'src/app/services/cercle.service';
import { RegionService } from 'src/app/services/region.service';
@Component({
  selector: 'app-edit-cercle',
  templateUrl: './edit-cercle.component.html',
  styleUrls: ['./edit-cercle.component.css']
})
export class EditCercleComponent implements OnInit {

  public donnee:any;
  public region: any;
  public regions: any;
  public cercles: any;
  //public base : string="http://localhost:8082/divisions/";
  public base="http://62.171.169.168:8082/divisions/"; /*connexion au serveur distant*/
  public nbPage : number=0;
  public pages : Array<number>=[];
  public url: string='';
  form : FormGroup= new FormGroup({});



  constructor(private http: HttpClient,private route:ActivatedRoute,
    private apiService: CercleService, private formBuilder:FormBuilder ,
    private router : Router, private regionService: RegionService) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      code : ['',[Validators.required, Validators.pattern("([0-9]).{1,}")]],
      nom : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
      region : ['',[Validators.required]],
      autre : [''],
    });
    this.url=this.route.snapshot.params['id']
    this.onGetCer();
    this.onGetAllReg();
  }

  onGetCer(){
    this.apiService.getById(this.url)
    .subscribe((data: any)=>{
    
    this.donnee=data;
    this.onGetReg(this.donnee.region)

  }, err=>{
    console.log(err);
  })

  }

  onGetReg(c:any){
    this.regionService.getById(c)
    .subscribe((data: any)=>{
    
    this.region=data;
    this.getCerByReg(this.region.id)

  }, err=>{
    console.log(err);
  })

  }

  onGetAllReg(){
    this.regionService.getRegions()
    .subscribe((data: any)=>{
    
    this.regions=data;

  }, err=>{
    console.log(err);
  })

  }

  getCerByReg(c: any){
    this.apiService.getCerByReg(c)
    .subscribe((data: any)=>{
    
    this.cercles=data;

  }, err=>{
    console.log(err);
  })

  }

  
  onSubmit(){
    console.log(this.form.value);
    console.log(this.url);
    this.apiService.Update(this.donnee.id, this.form.value).
    subscribe( (data: any) => {
      console.log(data);
      alert(" Cercle  "+this.form.value.nom+"  modifiee avec succes ");
      this.router.navigate(['cercles', this.region.id]);
      }, err=>{
        console.log(err);
        alert(err.error.message);
      });  
 
  }
 


}




