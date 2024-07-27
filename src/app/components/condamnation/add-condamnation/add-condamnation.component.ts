import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CitoyenService } from 'src/app/services/citoyen.service';
import { CondamnationService } from 'src/app/services/condamnation.service';
@Component({
  selector: 'app-add-condamnation',
  templateUrl: './add-condamnation.component.html',
  styleUrls: ['./add-condamnation.component.css']
})
export class AddCondamnationComponent implements OnInit {
  public donnees: any;
  public condamnation: any;
  keyword: string = '';
  totalSearch:number=0;
public currentPage: number=0;
  public size : number=6;
  public nbPage : number=0;
  public pages : Array<number>=[];

  constructor(private formBuilder:FormBuilder,
    private apiService: CondamnationService,private citoyenService: CitoyenService,
    private  router:Router) { }
    form : FormGroup= new FormGroup({});


  ngOnInit(): void {
    this.form=this.formBuilder.group({
      juridiction : ['',[Validators.required]],
      natureDelitCrime : ['',[Validators.required]],
      dateCondamnation : ['',[Validators.required]],
      dateDetention : ['',[Validators.required]],
      dateDelitCrime : ['',[Validators.required]],
      citoyen : ['',[Validators.required]],
      
    });
    
  }

  

  search(){
    this.citoyenService.search(this.keyword, this.currentPage, this.size)
    .subscribe((data: any) => { // Utilisez un type générique 'any' pour 'data'
      this.nbPage = data.totalPages;
      this.totalSearch=data.totalElements;
      this.pages = new Array<number>(this.nbPage);
      this.donnees = data.content;
      console.log(this.donnees)
    }, err => {
      console.log(err);
    });
  }

  onSubmit(){ 
    console.log(this.form.value);
    this.apiService.Create(this.form.value).
    subscribe( data => { this.condamnation=data;
        alert("Condamnation : "+
        "  ajoutée avec succes  !"); 
        this.router.navigate(['condamnations']);
        
        
      },err=>{
        
        console.log(err.error.message);
        
      });

}











}




