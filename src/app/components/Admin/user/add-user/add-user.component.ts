import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
    visible : string='';
    visibleConf : string='';


    ngOnInit(): void { this.visible='password' ; this.visibleConf='password'
      this.form = this.formBuilder.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
        confirmPassword: ['', [Validators.required]],
        role: ['']
      }, { validators: this.passwordMatchValidator });
    }
  
    // Validateur de confirmation de mot de passe
    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      if (!password || !confirmPassword) return null;
      return password.value === confirmPassword.value ? null : { mismatch: true };
    }
  
    // Validateur de mot de passe personnalisé
    passwordValidator(control: AbstractControl): ValidationErrors | null {
      const value = control.value;
      if (!value) {
        return null;
      }
  
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]+/.test(value);
  
      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
      return !passwordValid ? { passwordStrength: true } : null;
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
onVisible(){this.visible='text'}
onNotVisible(){this.visible='password'}
onVisibleConf(){this.visibleConf='text'}
onNotVisibleConf(){this.visibleConf='password'}

}

