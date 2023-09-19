import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoordinationService } from 'src/app/services/coordination.service'; 
@Component({
  selector: 'app-edit-coordination',
  templateUrl: './edit-coordination.component.html',
  styleUrls: ['./edit-coordination.component.css']
})
export class EditCoordinationComponent implements OnInit {

  public donnee : any;
  private url : string='';

  constructor(private formBuilder:FormBuilder ,private apiService: CoordinationService,
    private router:ActivatedRoute,
    private  route: Router) { }
    formEdit : FormGroup= new FormGroup({});
   
 


 
 ngOnInit(): void {
  this.formEdit=this.formBuilder.group({
    nom : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
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
   console.log(this.formEdit.value);
   console.log(this.url);
   this.apiService.Update(this.url, this.formEdit.value).
   subscribe( (data: any) => {
     console.log(data);
     alert(" Matiere  "+this.formEdit.value.nom+"  modifiee avec succes ");
     this.route.navigate(['coordinations']);
     }, err=>{
       console.log(err);
       alert("Cette matiere existe deja !");
     });  

 }

}

