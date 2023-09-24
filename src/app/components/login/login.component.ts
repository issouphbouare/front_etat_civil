import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationCancel, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public militant: any;
  public user: any;
  public erreur: number = 0;
  public erreur1: number = 0;
  login: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private apiResponse: AuthService, private location: Location,
    private router: Router) { }

  ngOnInit(): void {

    this.login = this.formBuilder.group({
      telephone: ['', Validators.required],
      motDePasse: ['', Validators.required]
    });
    this.erreur = 0;
    this.erreur1 = 0;
  }





  onSubmit() {
    console.log(this.login.value);
    const a = this.apiResponse.getCon(this.login.value.telephone).
      subscribe((data: any) => {
        this.user = data;
        console.log(this.user);
        if (data != null) {
          if (this.user.motDePasse == this.login.value.motDePasse &&
            this.user.telephone == this.login.value.telephone &&
            this.user.statut == "Actif") {
            this.apiResponse.signIn(this.user);

            //this.userService.setUserName(this.user);

            this.location.go(this.location.path());
            //window.location.reload()   
            this.router.navigate(['/']);
          }
          if (this.user.motDePasse != this.login.value.motDePasse &&
            this.user.statut == "Actif") { this.erreur = 1; this.erreur1 = 0 }
          if (this.user.motDePasse == this.login.value.motDePasse &&
            this.user.statut != "Actif") { this.erreur = 0; this.erreur1 = 1 }
          if (this.user.motDePasse != this.login.value.motDePasse &&
            this.user.statut != "Actif") { this.erreur1 = 1; this.erreur = 1; }
        }
        else { this.erreur = 1; this.erreur1 = 0 }
      }, err => {
        this.erreur = 1; this.erreur1 = 0
      });

  }
}

