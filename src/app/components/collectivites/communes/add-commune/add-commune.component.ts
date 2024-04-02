import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CercleService } from 'src/app/services/cercle.service';
import { CommuneService } from 'src/app/services/commune.service';
@Component({
  selector: 'app-add-commune',
  templateUrl: './add-commune.component.html',
  styleUrls: ['./add-commune.component.css']
})
export class AddCommuneComponent implements OnInit {

  public donnee:any;
  public cercle: any;
  public cercles: any;
  //public base : string="http://localhost:8082/divisions/";
  public base : string="http://62.171.169.168:8082/divisions/"; /*connexion au serveur distant*/
  public nbPage : number=0;
  public pages : Array<number>=[];
  public url: string='';
  form : FormGroup= new FormGroup({});

  

  constructor(private http: HttpClient,private route:ActivatedRoute,
    private apiService: CommuneService, private formBuilder:FormBuilder ,
    private router : Router, private cercleService: CercleService) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      code : ['',[Validators.required, Validators.pattern("([0-9]).{1,}")]],
      nom : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
      cercle : ['',[Validators.required]],
      autre : [''],
    });
    this.url=this.route.snapshot.params['id']
    this.onGetCer();
    
  }

  onGetCer(){
    this.cercleService.getById(this.url)
    .subscribe((data: any)=>{
    
    this.cercle=data;

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
      alert(" Commune  "+this.form.value.nom+"  ajoutée avec succes ");
      this.router.navigate(['communes',this.cercle.id]);
      }, err=>{
        console.log(err);
        alert(err.error.message);
      });  
 
  }
 


}






