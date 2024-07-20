import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CercleService } from 'src/app/services/cercle.service';
import { CommuneService } from 'src/app/services/commune.service';
import { RegionService } from 'src/app/services/region.service';
@Component({
  selector: 'app-add-commune',
  templateUrl: './add-commune.component.html',
  styleUrls: ['./add-commune.component.css']
})
export class AddCommuneComponent implements OnInit {

  public selectedReg:any; 
  public selectedCer:any;
  public cercle: any;
  public cercles: any;
  public regions: any;
  public nbPage : number=0;
  public pages : Array<number>=[];
  public url: string='';
  form : FormGroup= new FormGroup({});

  

  constructor(private http: HttpClient,private route:ActivatedRoute,
    private apiService: CommuneService, private formBuilder:FormBuilder ,
    private router : Router, private cercleService: CercleService, private regionService: RegionService) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      code : ['',[Validators.required, Validators.pattern("([0-9]).{1,}")]],
      nom : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
      cercle : ['',[Validators.required]],
      region : ['',[Validators.required]],
      autre : [''],
    });
    
    this.onGetRegions();
    
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
     this.cercleService.getCerByReg(this.selectedReg).subscribe((data: any)=>{
       this.cercles=data; 
       this.sortCercles(); 
          this.selectedCer=null;
         }, err=>{
             console.log(err);
           }); 
    }
  
  onSubmit(){
    console.log(this.form.value);
    console.log(this.url);
    this.apiService.Create(this.form.value).
    subscribe( (data: any) => {
      console.log(data);
      alert(" Arrondissement  "+this.form.value.nom+"  ajoutée avec succes ");
      this.router.navigate(['communes']);
      }, err=>{
        console.log(err);
        alert("Ce code ou nom d'Arrondissement existe deja !");
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
   sortCommunes(): void{
    this.cercles.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
   }
}






