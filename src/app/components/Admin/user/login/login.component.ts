import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationCancel, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private tokenStorageService: TokenStorageService) { }


  ngOnInit(): void {

    this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.erreur = 0;
    this.erreur1 = 0;
  }





  onSubmit() {
    console.log(this.login.value);
    this.authService.login(this.login.value).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
        this.reloadPage();
        
      }, err => {
        alert("login ou mot de passe erronés")
      });

  }
  reloadPage(): void {
  this.router.navigate(['citoyens']).then(() => {
    setTimeout(() => {
      window.location.reload();
    }, 100); // délai de 100 millisecondes
  });
}
}

