import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommuneService } from 'src/app/services/commune.service';
import { VqfService } from 'src/app/services/vqf.service';
import { CercleService } from 'src/app/services/cercle.service';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-edit-ville',
  templateUrl: './edit-ville.component.html',
  styleUrls: ['./edit-ville.component.css']
})
export class EditVilleComponent implements OnInit {

  public donnee:any;
  public commune: any;
  public communes: any;
  public cercle: any;
  public cercles: any;
  public region: any;
  public regions: any;
  //public base : string="http://localhost:8082/divisions/";
  public base="http://62.171.169.168:8082/divisions/"; /*connexion au serveur distant*/
  public nbPage : number=0;
  public pages : Array<number>=[];
  public url: string='';
  form : FormGroup= new FormGroup({});



  constructor(private http: HttpClient,private route:ActivatedRoute,
    private apiService: VqfService, private formBuilder:FormBuilder ,
    private router : Router, private communeService: CommuneService
    , private cercleService: CercleService, private regionService: RegionService) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      code : ['',[Validators.required, Validators.pattern("([0-9]).{1,}")]],
      nom : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
      commune : ['',[Validators.required]],
      cercle : ['',[Validators.required]],
      autre : [''],
    });
    this.url=this.route.snapshot.params['id']
    this.onGetVqf();
    this.onGetRegions()
    //this.onGetAllCer();
  }

  onGetVqf(){
    this.apiService.getById(this.url)
    .subscribe((data: any)=>{
    
    this.donnee=data;
    console.log(this.donnee)
    this.onGetCom(this.donnee.commune)
  }, err=>{
    console.log(err);
  })
  }

  onGetCom(c:any){
    this.communeService.getById(c)
    .subscribe((data: any)=>{
    
    this.commune=data;
    this.onGetCer(this.commune.cercle)
    console.log(data)

  }, err=>{
    console.log(err);
  })

  }
  onGetCer(c:any){
    this.cercleService.getById(c)
    .subscribe((data: any)=>{
    
    this.cercle=data;
    this.onGetReg(this.cercle.region);
    this.onGetComByCer(this.cercle.id);
  }, err=>{
    console.log(err);
  })

  }

  

  onGetReg(c:any){
    this.regionService.getById(c)
    .subscribe((data: any)=>{
    
    this.region=data;
    this.onGetCerByReg(this.region.id)

  }, err=>{
    console.log(err);
  })

  }

  onGetComByCer(cercle:any){
    this.communeService.getComByCer(cercle)
    .subscribe((data: any)=>{
    
    this.communes=data;
    if(cercle!=this.commune.cercle){
      this.commune.cercle=null;
        this.commune.id=null;
        
    }
  }, err=>{
    console.log(err);
  })

  }

  onGetRegions(){
    this.regionService.getRegions().subscribe((data: any)=>{
      this.regions=data;
      this.sortRegions()
        console.log(this.regions);
        }, err=>{
            console.log(err);
          }); 
   }
 
   
   onGetCerByReg(region:any){    
     this.cercleService.getCerByReg(region).subscribe((data: any)=>{
       this.cercles=data; 
       this.sortCercles(); 
       if(region!=this.cercle.region){
        this.cercle.id=null;
        this.cercle.region=null;
        this.commune.id=null;
        this.communes=null;
       }
         }, err=>{
             console.log(err);
           }); 
    }
    

  /* onGetAllCer(){
    this.cercleService.getCercles()
    .subscribe((data: any)=>{
    
    this.cercles=data;

  }, err=>{
    console.log(err);
  })
  } */

  
  onSubmit(){
    console.log(this.form.value);
    console.log(this.url);
    this.apiService.Update(this.donnee.id, this.form.value).
    subscribe( (data: any) => {
      console.log(data);
      alert(" Ville  "+this.form.value.nom+"  modifiee avec succes ");
      this.router.navigate(['villes']);
      }, err=>{
        console.log(err);
        alert(err.error.message);
      });  
 
  }

  sortCommunes(): void{
    this.communes.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
   }
 
   sortRegions(): void{
    this.regions.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
   }
   sortCercles(): void{
    this.cercles.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
   }
   
  }