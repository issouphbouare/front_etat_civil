import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  public donnee : any;
  private url : string='';
  editing : boolean=false

  constructor(private formBuilder:FormBuilder,
    private apiService: UserService,
    private  router:Router, private  route:ActivatedRoute) { }
    form : FormGroup= new FormGroup({});
    public erreur1 : number =0;


  ngOnInit(): void {
    this.form=this.formBuilder.group({
      role : ['',[Validators.required]],
    });
    this.url=this.route.snapshot.params['id']
    this.getUser();
    this.editing=false;
    
  }
  getUser(){
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
    
    this.apiService.AddRole(this.donnee.id,this.form.value.role ,this.form.value).
    subscribe( data => {
        alert("Role : "+this.form.value.role+
        "  ajouté avec succes  !"); 
        window.location.reload();
      },err=>{
        console.log(err.error.message);
        
      });
}

selectedRole: string = '';
  optionsRole = [
    { value: '', label: '' },
    { value: 'ROLE_USER', label: 'ROLE_USER' },
    { value: 'ROLE_ADMIN', label: 'ROLE_ADMIN' }
  ];
  onSelectionRole() {
  }
  onAdding(){
    this.editing=true
  }
  onReturn(){
    this.editing=false
  }

  onDelete(a: any){
    if(confirm("Voulez-vous vraiment supprimé le role  " +a+ " de l'utilisateur "
    +this.donnee.username+" ?")){
      console.log();
      this.apiService.DeleteRole(this.donnee.id, a)
      .subscribe( data=>{
        //this.onSearch();
        window.location.reload();
    
        }, err=>{
          console.log(err);
        }
      );
  
    //alert("Militant  supprimé avec succes");
  }
    
  }
}


