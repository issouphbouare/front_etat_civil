import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
 
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

public username? : String;
user : any;
visible : string='';
visible1 : string='';
visible2 : string='';





constructor(private formBuilder:FormBuilder,
  private apiService: UserService, private tokenStorageService : TokenStorageService,
  private  router:Router ,private route: ActivatedRoute) { }
  formEdit : FormGroup= new FormGroup({});

ngOnInit() { this.visible='password'; this.visible1='password'; this.visible2='password'
  this.username=this.route.snapshot.params['id']
  this.getUser()
    

this.formEdit=this.formBuilder.group({
  password : ['',[Validators.required]],
  newPassword : ['',[Validators.required]],
  confirmation : ['',[Validators.required]]
   
});
}

getUser(){
  this.apiService.getByUsername(this.username).
  subscribe(data=>{
                this.user=data;
                console.log(this.user);
  }, err=>{
      console.log(err);
     } 
);
}

onSubmit(){
  //console.log(this.formEdit.value);
  //console.log(this.url1+this.militant.id);
  //this.url2=this.url1+this.militant.id;

      this.apiService.UpdatePassword(this.user.id, this.formEdit.value).
  subscribe( data => {
    //console.log(data);
    alert(" Mot de passe modifié avec succes !");
    this.tokenStorageService.signOut();
    }, err=>{
       
      alert(" Ancien mot de passe incorrecte ou nouveau mot de passe different de la confirmation  !");
    });
    
}


onVisible(){this.visible='text'}
onNotVisible(){this.visible='password'}
onVisible1(){this.visible1='text'}
onNotVisible1(){this.visible1='password'}
onVisible2(){this.visible2='text'}
onNotVisible2(){this.visible2='password'}

}


