import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CercleService } from 'src/app/services/cercle.service';
import { CitoyenService } from 'src/app/services/citoyen.service';
import { CommuneService } from 'src/app/services/commune.service';
import { DocumentService } from 'src/app/services/document.service';
import { JasperService } from 'src/app/services/jasper.service';
import { ProfessionService } from 'src/app/services/profession.service';
import { RegionService } from 'src/app/services/region.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { VqfService } from 'src/app/services/vqf.service';

@Component({
  selector: 'app-citoyen',
  templateUrl: './citoyen.component.html',
  styleUrls: ['./citoyen.component.css']
})
export class CitoyenComponent implements OnInit {
  constructor(private route: ActivatedRoute, private apiService: CitoyenService, private tokenStorageService: TokenStorageService,
    private vqfService:VqfService, private communeService:CommuneService, private jasperService: JasperService,
    private cercleService:CercleService,private regionService:RegionService, private router: Router, private documentService: DocumentService,
    private professionService:ProfessionService, private sanitizer: DomSanitizer, private formBuilder:FormBuilder,
  ){}
  form : FormGroup= new FormGroup({});
  imageUrl: SafeUrl | null = null;
  public citoyen:any;
  public url!: string;
  public lieuNaissance:any;
  public commune: any;
  public cercle: any;
  public region: any;
  public adresse: any;
  public communeA: any;
  public cercleA: any;
  public regionA: any;
  profession:any;
  professionP:any;
  professionM:any;

  isLoggedIn = false;
  isAdmin = false;
  isUser = false;
  ngOnInit(): void {
    this.url=this.route.snapshot.params['id']
    this.onGetCitoyen();
    
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.isAdmin=this.tokenStorageService.getIsAdmin(user.roles)
      this.isUser=this.tokenStorageService.getIsUser(user.roles)

    }
    
    this.form=this.formBuilder.group({
      type : ['',[Validators.required]],
      citoyen : ['',[Validators.required]],
      
    });

  }

  onGetCitoyen(){
    this.apiService.getById(this.url)
    .subscribe((data: any)=>{
    
    this.citoyen=data;
       this.onGetLieuNaissance(this.citoyen.lieuNaissance)
       this.onGetAdresse(this.citoyen.adresse)
       this.onGetProfession(this.citoyen.profession)
       this.onGetProfessionP(this.citoyen.professionPere)
       this.onGetProfessionM(this.citoyen.professionMere)
       this.loadImage()
  }, err=>{
    console.log(err);
  })
  }

  onGetLieuNaissance(id:any){
    this.vqfService.getById(id)
    .subscribe((data: any)=>{
    this.lieuNaissance=data;
    this.onGetCommune(this.lieuNaissance.commune)
  }, err=>{
    console.log(err);
  })
}
onGetAdresse(id:any){
  this.vqfService.getById(id)
  .subscribe((data: any)=>{
  this.adresse=data;
  this.onGetCommuneA(this.adresse.commune)
}, err=>{
  console.log(err);
})
}
onGetCommune(id:any){
  this.communeService.getById(id)
  .subscribe((data: any)=>{
  this.commune=data;
  this.onGetCercle(this.commune.cercle)
}, err=>{
  console.log(err);
})
}
onGetCommuneA(id:any){
this.communeService.getById(id)
.subscribe((data: any)=>{
this.communeA=data;
this.onGetCercleA(this.communeA.cercle)
}, err=>{
console.log(err);
})
}
onGetCercle(id:any){
  this.cercleService.getById(id)
  .subscribe((data: any)=>{
  this.cercle=data;
  this.onGetRegion(this.cercle.region)
}, err=>{
  console.log(err);
})
}
onGetCercleA(id:any){
this.cercleService.getById(id)
.subscribe((data: any)=>{
this.cercleA=data;
this.onGetRegionA(this.cercleA.region)

}, err=>{
console.log(err);
})
}
onGetRegion(id:any){
  this.regionService.getById(id)
  .subscribe((data: any)=>{
  this.region=data;
}, err=>{
  console.log(err);
})
}
onGetRegionA(id:any){
this.regionService.getById(id)
.subscribe((data: any)=>{
this.regionA=data;
}, err=>{
console.log(err);
})
}
onGetProfession(id:any){
  this.professionService.getById(id)
  .subscribe((data: any)=>{
  this.profession=data;
}, err=>{
  console.log(err);
})
}
onGetProfessionP(id:any){
this.professionService.getById(id)
.subscribe((data: any)=>{
this.professionP=data;
}, err=>{
console.log(err);
})
}
onGetProfessionM(id:any){
  this.professionService.getById(id)
  .subscribe((data: any)=>{
  this.professionM=data;
}, err=>{
  console.log(err);
})
}


  loadImage(): void {
    const filename = this.citoyen.portrait; // Nom du fichier à charger
    this.apiService.getImage(filename).subscribe(
      (blob) => {
        const objectURL = URL.createObjectURL(blob); // Convertir le Blob en URL
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL); // Sécuriser l'URL
      },
      (error) => console.error('Erreur lors du chargement de l\'image:', error) // Gérer les erreurs
    );
  }
  
  genererCarte(): void {
    this.form.value.type="Carte_Biometrique"
    this.form.value.citoyen=this.citoyen.id
    this.addDoc(this.form);
    this.jasperService.generateCarte(this.citoyen.id).subscribe(
      (response: Blob) => {
        this.jasperService.downloadFile(response,"carte_Biometrique_"+this.citoyen.id.toString());
      },
      error => {
        console.error('Erreur lors du téléchargement du recu : ', error);
      }
    ); 
  }

  genererFiche(): void {
    this.form.value.type="Fiche_individuelle"
    this.form.value.citoyen=this.citoyen.id
    this.addDoc(this.form);
    this.jasperService.generateFiche(this.citoyen.id).subscribe(
      (response: Blob) => {
        this.jasperService.downloadFile(response,"fiche_individuelle_"+this.citoyen.id.toString());
      },
      error => {
        console.error('Erreur lors du téléchargement du recu : ', error);
      }
    ); 
  }

  genererRecu(): void {
    this.form.value.type="Recépissé"
    this.form.value.citoyen=this.citoyen.id
    this.addDoc(this.form);
    this.jasperService.generateRecu(this.citoyen.id).subscribe(
      (response: Blob) => {
        this.jasperService.downloadFile(response,"recépissé_"+this.citoyen.id.toString());
      },
      error => {
        console.error('Erreur lors du téléchargement du recu : ', error);
      }
    ); 
  }

  genererNationalite(): void {
    this.form.value.type="Certificat_Nationalité"
    this.form.value.citoyen=this.citoyen.id
    this.addDoc(this.form);
    this.jasperService.generateNationalite(this.citoyen.id).subscribe(
      (response: Blob) => {
        this.jasperService.downloadFile(response,"Nationalité_"+this.citoyen.id.toString());
      },
      error => {
        console.error('Erreur lors du téléchargement du certificat : ', error);
      }
    ); 
  }

  onDelete(a: any){
    if(confirm("Voulez-vous vraiment supprimer ce citoyen ?")){
      console.log();
      this.apiService.delete(a)
      .subscribe( data=>{
        this.router.navigate(['citoyens']);    
        }, err=>{
          console.log(err);
        }
      );
  
    alert("Citoyen  supprimé avec succès");
  }
  }

  addDoc(doc: any){
    this.documentService.Create(this.form.value).
    subscribe( data => {},
      err=>{});
  }
}
