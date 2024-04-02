import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionService } from 'src/app/services/profession.service';
@Component({
  selector: 'app-edit-profession',
  templateUrl: './edit-profession.component.html',
  styleUrls: ['./edit-profession.component.css']
})
export class EditProfessionComponent implements OnInit {

  public donnee : any;
  private url : string='';

  constructor(private formBuilder:FormBuilder ,private apiService: ProfessionService,
    private router:ActivatedRoute,
    private  route: Router) { }
    form : FormGroup= new FormGroup({});
   
 


 
 ngOnInit(): void {
  this.form=this.formBuilder.group({
    libelle : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
  });
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
     alert(" Profession  "+this.form.value.libelle+"  modifiee avec succes ");
     this.route.navigate(['professions']);
     }, err=>{
       console.log(err);
       alert(alert(err.error.message));
     });  

 }

}

