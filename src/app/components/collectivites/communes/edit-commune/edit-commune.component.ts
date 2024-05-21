import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommuneService } from 'src/app/services/commune.service';
import { CercleService } from 'src/app/services/cercle.service';
import { RegionService } from 'src/app/services/region.service';
@Component({
  selector: 'app-edit-commune',
  templateUrl: './edit-commune.component.html',
  styleUrls: ['./edit-commune.component.css']
})
export class EditCommuneComponent implements OnInit {

  public donnee:any;
  public cercle: any;
  public region: any;
  public regions: any;
  public cercles: any;
  public selectedReg:any; 
  public selectedCer:any;
  //public base : string="http://localhost:8082/divisions/";
  public base="http://62.171.169.168:8082/divisions/"; /*connexion au serveur distant*/
  public nbPage : number=0;
  public pages : Array<number>=[];
  public url: string='';
  form : FormGroup= new FormGroup({});



  constructor(private http: HttpClient,private route:ActivatedRoute,
    private apiService: CommuneService,private regionService: RegionService, private formBuilder:FormBuilder ,
    private router : Router, private cercleService: CercleService) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      code : ['',[Validators.required, Validators.pattern("([0-9]).{1,}")]],
      nom : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
      cercle : ['',[Validators.required]],
      region : ['',[Validators.required]],
      autre : [''],
    });
    this.url=this.route.snapshot.params['id']
    this.onGetCom();
    this.onGetRegions()
    //this.onGetAllCer();
  }

  onGetCom(){
    this.apiService.getById(this.url)
    .subscribe((data: any)=>{
    
    this.donnee=data;
    this.onGetCer(this.donnee.cercle)
    

  }, err=>{
    console.log(err);
  })

  }

  onGetCer(c:any){
    this.cercleService.getById(c)
    .subscribe((data: any)=>{
    
    this.cercle=data;
    this.selectedCer=this.cercle.id;
    this.onGetReg(this.cercle.region);
  }, err=>{
    console.log(err);
  })

  }

  

  onGetReg(c:any){
    this.regionService.getById(c)
    .subscribe((data: any)=>{
    
    this.region=data;
    this.onGetCerByReg()

  }, err=>{
    console.log(err);
  })

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
      alert(" Cercle  "+this.form.value.nom+"  modifiee avec succes ");
      this.router.navigate(['communes']);
      }, err=>{
        console.log(err);
        alert(err.error.message);
      });  
 
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
 
   
   onGetCerByReg(){      
     this.cercleService.getCerByReg(this.region.id).subscribe((data: any)=>{
       this.cercles=data; 
       this.sortCercles();  
       if(this.region.id!=this.cercle.region) {
        this.selectedCer=null;
       } else this.selectedCer=this.cercle.id
         }, err=>{
             console.log(err);
           }); 
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





