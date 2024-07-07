import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionService } from 'src/app/services/region.service';
@Component({
  selector: 'app-edit-region',
  templateUrl: './edit-region.component.html',
  styleUrls: ['./edit-region.component.css']
})
export class EditRegionComponent implements OnInit {

  public donnee : any;
  private url : string='';

  constructor(private formBuilder:FormBuilder ,private apiService: RegionService,
    private router:ActivatedRoute,
    private  route: Router) { }
    form : FormGroup= new FormGroup({});
   
 


 
 ngOnInit(): void {
  this.form=this.formBuilder.group({
    code : ['',[Validators.required, Validators.pattern("([0-9]).{1,}")]],
    nom : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
    autre : [''],  });
  this.url=this.router.snapshot.params['id']
  this.apiService.getById(this.url).
      subscribe(data=>{
                    this.donnee=data;
                    console.log(this.donnee);
      }, err=>{
          console.log(err);
         } 
  );


 }
 onSubmit(){
   console.log(this.form.value);
   console.log(this.url);
   this.apiService.Update(this.url, this.form.value).
   subscribe( (data: any) => {
     console.log(data);
     alert(" Region  "+this.form.value.nom+"  modifiee avec succes ");
     this.route.navigate(['regions']);
     }, err=>{
       console.log(err);
       alert("Ce code ou nom de Region existe deja !");
     });  

 }

}
