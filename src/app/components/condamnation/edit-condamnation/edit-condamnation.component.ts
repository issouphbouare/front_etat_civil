import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CondamnationService } from 'src/app/services/condamnation.service';
@Component({
  selector: 'app-edit-condamnation',
  templateUrl: './edit-condamnation.component.html',
  styleUrls: ['./edit-condamnation.component.css']
})
export class EditCondamnationComponent implements OnInit {

  public donnee : any;
  private url : string='';
  public editing : string='hidden'
  public editing1 : string='hidden'
  public editing2 : string='hidden'

  constructor(private formBuilder:FormBuilder ,private apiService: CondamnationService,
    private router:ActivatedRoute,
    private  route: Router) { }
    form : FormGroup= new FormGroup({});
   
 


 
 ngOnInit(): void {this.editing="hidden"; this.editing1="hidden"; this.editing2="hidden"
  this.form=this.formBuilder.group({
    juridiction : ['',[Validators.required]],
      natureDelitCrime : ['',[Validators.required]],
      dateCondamnation : ['',[Validators.required]],
      dateDetention : ['',[Validators.required]],
      dateDelitCrime : ['',[Validators.required]],
      citoyen : ['',[Validators.required]],
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
     alert(" Condamnation  modifiée avec succès ");
     this.route.navigate(['condamnations']);
     }, err=>{
       console.log(err);
       
     });  

 }

 onEditing(){
  this.editing="date"
}
noEditing(){
  this.editing="hidden"
}
onEditing1(){
  this.editing1="date"
}
noEditing1(){
  this.editing1="hidden"
}
onEditing2(){
  this.editing2="date"
}
noEditing2(){
  this.editing2="hidden"
}

}


