import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CercleService } from 'src/app/services/cercle.service';
import { RegionService } from 'src/app/services/region.service';
@Component({
  selector: 'app-add-cercle',
  templateUrl: './add-cercle.component.html',
  styleUrls: ['./add-cercle.component.css']
})
export class AddCercleComponent implements OnInit {

  public donnee:any;
  public region: any;
  public regions: any;
  //public base : string="http://localhost:8082/divisions/";
  public base : string="http://62.171.169.168:8082/divisions/"; /*connexion au serveur distant*/
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
    this.onGetReg();
    
  }

  onGetReg(){
    this.regionService.getById(this.url)
    .subscribe((data: any)=>{
    
    this.region=data;

  }, err=>{
    console.log(err);
  })

  }

 

  

  
  onSubmit(){
    console.log(this.form.value);
    console.log(this.url);
    this.apiService.Create(this.form.value).
    subscribe( (data: any) => {
      console.log(data);
      alert(" Cercle  "+this.form.value.nom+"  ajoutée avec succes ");
      this.router.navigate(['cercles',this.region.id]);
      }, err=>{
        console.log(err);
        alert(err.error.message);
      });  
 
  }
 


}




