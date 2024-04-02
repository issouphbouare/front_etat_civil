import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegionService } from 'src/app/services/region.service';
@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.css']
})
export class AddRegionComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private apiService: RegionService,
    private  router:Router) { }
    form : FormGroup= new FormGroup({});


  ngOnInit(): void {
    this.form=this.formBuilder.group({
      code : ['',[Validators.required, Validators.pattern("([0-9]).{1,}")]],
      nom : ['',[Validators.required, Validators.pattern("([A-Z]).{2,}")]],
      autre : [''],
    });
    
  }

  onSubmit(){ 
    console.log(this.form.value);
    this.apiService.Create(this.form.value).
    subscribe( data => {
        alert("Region : "+this.form.value.nom+
        "  ajoutée avec succes  !"); 
        this.router.navigate(['regions']);
      },err=>{
        
        console.log(err.error.message);
        alert(err.error.message);
      });

}

}


