import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CitoyenService } from 'src/app/services/citoyen.service';

@Component({
  selector: 'app-declaration-deces',
  templateUrl: './declaration-deces.component.html',
  styleUrls: ['./declaration-deces.component.css']
})
export class DeclarationDecesComponent implements OnInit {

  public donnee : any;
  private url : string='';

  constructor(private formBuilder:FormBuilder ,private apiService: CitoyenService,
    private router:ActivatedRoute,
    private  route: Router) { }
    form : FormGroup= new FormGroup({});





 ngOnInit(): void {
  this.form=this.formBuilder.group({
    dateDeces : ['', [Validators.required, this.validateDateDeces]],
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
   this.apiService.Deceder(this.url, this.form.value).
   subscribe( (data: any) => {
     console.log(data);
     alert(" Décès déclaré avec succès 1 ");
     this.route.navigate(['citoyens']);
     }, err=>{
       console.log(err);
       //alert(alert("Cette profession existe déja !"));
     });

 }

 //Validation de la date de naissaince
 validateDateDeces(control: any): { [key: string]: any } | null {
  const selectedDate: Date = new Date(control.value);
  const currentDate: Date = new Date();
  const ageLimite: number = 100; // Vous pouvez ajuster la limite d'âge ici

  if (!selectedDate || isNaN(selectedDate.getTime())) {
    return { 'invalidDate': true };
  }

  // Vérifie si la date est supérieure à la date actuelle
  if (selectedDate > currentDate) {
    return { 'dateFutur': true };
  }

  // Vérifie si l'âge calculé est supérieur à l'âge limite
  const diff = currentDate.getFullYear() - selectedDate.getFullYear();
  if (diff > ageLimite) {
    return { 'ageLimiteDepasse': true };
  }

  return null;
}
}


