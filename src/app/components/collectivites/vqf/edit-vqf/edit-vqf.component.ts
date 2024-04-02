import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommuneService } from 'src/app/services/commune.service';
import { VqfService } from 'src/app/services/vqf.service';
@Component({
  selector: 'app-edit-vqf',
  templateUrl: './edit-vqf.component.html',
  styleUrls: ['./edit-vqf.component.css']
})
export class EditVqfComponent implements OnInit {

  public donnee:any;
  public commune: any;
  public communes: any;
  //public base : string="http://localhost:8082/divisions/";
  public base="http://62.171.169.168:8082/divisions/"; /*connexion au serveur distant*/
  public nbPage : number=0;
  public pages : Array<number>=[];
  public url: string='';
  form : FormGroup= new FormGroup({});



  constructor(private http: HttpClient,private route:ActivatedRoute,
    private apiService: VqfService, private formBuilder:FormBuilder ,
    private router : Router, private communeService: CommuneService) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      code : ['',[Validators.required, Validators.pattern("([0-9]).{1,}")]],
      nom : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
      commune : ['',[Validators.required]],
      autre : [''],
    });
    this.url=this.route.snapshot.params['id']
    this.onGetVqf();
    //this.onGetAllCer();
  }

  onGetVqf(){
    this.apiService.getById(this.url)
    .subscribe((data: any)=>{
    
    this.donnee=data;
    this.onGetCom(this.donnee.commune)

  }, err=>{
    console.log(err);
  })

  }

  onGetCom(c:any){
    this.communeService.getById(c)
    .subscribe((data: any)=>{
    
    this.commune=data;
    this.onGetCommunesByCer(this.commune.cercle)

  }, err=>{
    console.log(err);
  })

  }

  onGetCommunesByCer(c:any){
    this.communeService.getComByCer(c)
    .subscribe((data: any)=>{
    
    this.communes=data;

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
      alert(" Vqf  "+this.form.value.nom+"  modifiee avec succes ");
      this.router.navigate(['vqfs', this.commune.id]);
      }, err=>{
        console.log(err);
        alert(err.error.message);
      });  
 
  }
 


}






