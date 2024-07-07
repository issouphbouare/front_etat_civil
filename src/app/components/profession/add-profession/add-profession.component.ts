import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfessionService } from 'src/app/services/profession.service';
@Component({
  selector: 'app-add-profession',
  templateUrl: './add-profession.component.html',
  styleUrls: ['./add-profession.component.css']
})
export class AddProfessionComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private apiService: ProfessionService,
    private  router:Router) { }
    form : FormGroup= new FormGroup({});


  ngOnInit(): void {
    this.form=this.formBuilder.group({
      
      libelle : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
      
    });
    
  }

  onSubmit(){ 
    console.log(this.form.value);
    this.apiService.Create(this.form.value).
    subscribe( data => {
        alert("Profession : "+this.form.value.libelle+
        "  ajoutée avec succes  !"); 
        this.router.navigate(['professions']);
      },err=>{
        
        console.log(err.error.message);
        alert("cette profession existe déja !");
      });

}

}


