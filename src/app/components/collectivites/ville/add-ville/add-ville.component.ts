import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VqfService } from 'src/app/services/vqf.service';
import { CommuneService } from 'src/app/services/commune.service';
import { CercleService } from 'src/app/services/cercle.service';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-add-ville',
  templateUrl: './add-ville.component.html',
  styleUrls: ['./add-ville.component.css']
})
export class AddVilleComponent implements OnInit {

  public donnee:any;
  public selectedReg:any;
  public selectedCer:any;
  public commune: any;
  public communes: any;
  
  public region: any;
  public regions: any;
  
  public cercle: any;
  public cercles: any;
  //public base : string="http://localhost:8082/divisions/";
  public base : string="http://62.171.169.168:8082/divisions/"; /*connexion au serveur distant*/
  public nbPage : number=0;
  public pages : Array<number>=[];
  public url: string='';
  form : FormGroup= new FormGroup({});

  

  constructor(private http: HttpClient,private route:ActivatedRoute,
    private apiService: VqfService, private formBuilder:FormBuilder ,
    private router : Router, private communeService: CommuneService
    , private cercleService: CercleService, private regionService: RegionService) { }

  ngOnInit(): void { this.selectedReg=11; this.onGetCerByReg()
    this.form=this.formBuilder.group({
      nom : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
      commune : ['',[Validators.required]],
      cercle : ['',[Validators.required]],
      autre : [''],
    });
    this.url=this.route.snapshot.params['id']
    this.onGetCom();
    this.onGetRegions()
    
  }

  onGetCom(){
    this.communeService.getById(this.url)
    .subscribe((data: any)=>{
    
    this.commune=data;

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
 
   
   onGetCerByReg(){      
     this.cercleService.getCerByReg(this.selectedReg).subscribe((data: any)=>{
       this.cercles=data; 
       this.sortCercles(); 
       this.selectedCer=null;
       this.communes=null;
       this.commune=null;   
         }, err=>{
             console.log(err);
           }); 
    }
    onGetComByCer(){      
      this.communeService.getComByCer(this.selectedCer).subscribe((data: any)=>{
        this.communes=data; 
        this.commune=null;
        this.sortCercles();    
          }, err=>{
              console.log(err);
            }); 
     }

  onSubmit(){
    console.log(this.form.value);
    console.log(this.url);
    this.apiService.CreateV(this.form.value).
    subscribe( (data: any) => {
      console.log(data);
      alert(" Ville  "+this.form.value.nom+"  ajoutée avec succes ");
      this.router.navigate(['villes']);
      }, err=>{
        console.log(err);
        alert("Ce code ou nom de Ville existe deja !");
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
    this.communes.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
   }

}








