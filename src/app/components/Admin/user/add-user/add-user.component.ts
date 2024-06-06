import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  constructor(private formBuilder:FormBuilder,
    private apiService: UserService,
    private  router:Router) { }
    form : FormGroup= new FormGroup({});
    public erreur1 : number =0;


  ngOnInit(): void {
    this.form=this.formBuilder.group({
      username : ['',[Validators.required]],
      email : ['',[Validators.required]],
      password : ['',[Validators.required]],
      confirmPassword : ['', [Validators.required]],
      role: [''],
      

    });
    
  }

  onSubmit(){ 
    console.log(this.form.value);
    if(this.form.value.password==this.form.value.confirmPassword){
      this.form.value.role=["user"]
    this.apiService.Create(this.form.value).
    subscribe( data => {
        alert("User : "+this.form.value.username+
        "  ajoutée avec succes  !"); 
        this.router.navigate(['users']);
      },err=>{
        console.log(err.error.message);
        if(err.error.message==undefined){
          alert("User : "+this.form.value.username+
        "  ajoutée avec succes  !"); 
        this.router.navigate(['users']);
        } else alert(err.error.message);
        
      });

}
  else this.erreur1=1;

}

}

