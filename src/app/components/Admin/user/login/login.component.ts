import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
  visible : string='';
  isPasswordVisible = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private tokenStorageService: TokenStorageService) { }


  ngOnInit(): void { this.visible='password'

    this.login = this.formBuilder.group({
      username: [''],
      password: ['']
    });
    this.erreur = 0;
    this.erreur1 = 0;
  }



  isMobile(): boolean {
    return window.innerWidth < 768; // Ajustez cette valeur selon vos besoins
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
  this.router.navigate(['dashboard']).then(() => {
    setTimeout(() => {
      window.location.reload();
    }, 100); // délai de 100 millisecondes
  });
}







  //visible: string = 'password';

  toggleVisibility() {
    this.visible = this.visible === 'password' ? 'text' : 'password';
  }
}

