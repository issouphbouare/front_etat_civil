import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  public donnee : any;
  private url : string='';
  editing: boolean=true

  constructor(private formBuilder:FormBuilder,
    private apiService: UserService,private tokenStorageService: TokenStorageService,
    private  router:Router, private  route:ActivatedRoute) { }
    form : FormGroup= new FormGroup({});
    public erreur1 : number =0;


  ngOnInit(): void {
    this.form=this.formBuilder.group({
      username : ['',[Validators.required]],
      email : ['',[Validators.required]],
      
    });
    this.url=this.route.snapshot.params['id']
    this.getUser();
    this.editing=false
    
  }

  onEdit(){this.editing=true}
  getUser(){
    this.apiService.getByUsername(this.url).
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
    
    this.apiService.Update(this.donnee.id,this.form.value).
    subscribe( data => {
        alert("User : "+this.form.value.username+
        "  modifiée avec succes  !"); 
        this.tokenStorageService.signOut()
      },err=>{
        alert("Il existe un utilisateur avec le meme username ou le meme email !!!")
        console.log(err.error.message);
        
      });


}

}



