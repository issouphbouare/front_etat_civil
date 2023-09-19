import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoordinationService } from 'src/app/services/coordination.service'; 
@Component({
  selector: 'app-add-coordination',
  templateUrl: './add-coordination.component.html',
  styleUrls: ['./add-coordination.component.css']
})
export class AddCoordinationComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private apiService: CoordinationService,
    private  router:Router) { }
    formAdd : FormGroup= new FormGroup({});


  ngOnInit(): void {
    this.formAdd=this.formBuilder.group({
      nom : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
    });
    
  }

  onSubmit(){ 
    console.log(this.formAdd.value);
    this.apiService.Create(this.formAdd.value).
    subscribe( data => {
        alert("Coordination : "+this.formAdd.value.nom+
        "  ajoutée avec succes  !"); 
        this.router.navigate(['coordinations']);
      },err=>{
        console.log(err);
        alert("Cette coordination existe deja !");
      });

}

}

