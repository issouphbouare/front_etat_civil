import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CitoyenService } from 'src/app/services/citoyen.service';
import { DocumentService } from 'src/app/services/document.service';
import { JasperService } from 'src/app/services/jasper.service';
@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {
  public donnees: any;
  keyword: string = '';
  totalSearch:number=0;
public currentPage: number=0;
  public size : number=6;
  public nbPage : number=0;
  public pages : Array<number>=[];

  constructor(private formBuilder:FormBuilder,
    private apiService: DocumentService,private citoyenService: CitoyenService,
    private  router:Router, private jasperService :JasperService) { }
    form : FormGroup= new FormGroup({});


  ngOnInit(): void {
    this.form=this.formBuilder.group({
      type : ['',[Validators.required]],
      citoyen : ['',[Validators.required]],
      
    });
    
  }

  selectedType: string = '';
  options: { value: string, label: string }[] = [
    { value: '', label: '' },
    { value: 'Carte_Biometrique', label: 'Carte_Biometrique' },
    { value: 'Certificat_Nationalité', label: 'Certificat_Nationalité' },
    { value: 'Fiche_individuelle', label: 'Fiche_individuelle' },
    { value: 'Recépissé', label: 'Recépissé' }

  ];
  onSelectionType() { }

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
    subscribe( data => {
        
        alert("Document : "+this.form.value.type+
        "  ajoutée avec succes  !"); 
        this.router.navigate(['documents']);
        this.generateDoc(this.form.value)
        
      },err=>{
        
        console.log(err.error.message);
        alert(err.error.message);
      });

}

generateDoc(doc: any){
    if(doc.type=="Recépissé") this.genererRecu(doc.citoyen)
    if(doc.type=="Fiche_individuelle") this.genererFiche(doc.citoyen)
    if(doc.type=="Certificat_Nationalité") this.genererNationalite(doc.citoyen)
    if(doc.type=="Carte_Biometrique") this.genererCarte(doc.citoyen)

}

genererCarte(c:number): void {
  this.jasperService.generateCarte(c).subscribe(
    (response: Blob) => {
      this.jasperService.downloadFile(response,"carte_Biometrique_"+c.toString());
    },
    error => {
      console.error('Erreur lors du téléchargement du recu : ', error);
    }
  ); 
}

genererFiche(c:number): void {
  this.jasperService.generateFiche(c).subscribe(
    (response: Blob) => {
      this.jasperService.downloadFile(response,"fiche_individuelle_"+c.toString());
    },
    error => {
      console.error('Erreur lors du téléchargement du recu : ', error);
    }
  ); 
}

genererRecu(c:number): void {
  this.jasperService.generateRecu(c).subscribe(
    (response: Blob) => {
      this.jasperService.downloadFile(response,"recépissé_"+c.toString());
    },
    error => {
      console.error('Erreur lors du téléchargement du recu : ', error);
    }
  ); 
}

genererNationalite(c:number): void {
  this.jasperService.generateNationalite(c).subscribe(
    (response: Blob) => {
      this.jasperService.downloadFile(response,"Nationalité_"+c.toString());
    },
    error => {
      console.error('Erreur lors du téléchargement du certificat : ', error);
    }
  ); 
}


}



