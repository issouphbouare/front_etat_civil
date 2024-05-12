import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Route } from '@angular/router';
import { CercleService } from 'src/app/services/cercle.service';
import { CitoyenService } from 'src/app/services/citoyen.service';
import { CommuneService } from 'src/app/services/commune.service';
import { ProfessionService } from 'src/app/services/profession.service';
import { RegionService } from 'src/app/services/region.service';
import { VqfService } from 'src/app/services/vqf.service';

@Component({
  selector: 'app-citoyen',
  templateUrl: './citoyen.component.html',
  styleUrls: ['./citoyen.component.css']
})
export class CitoyenComponent implements OnInit {
  constructor(private route: ActivatedRoute, private apiService: CitoyenService,
    private vqfService:VqfService, private communeService:CommuneService,
    private cercleService:CercleService,private regionService:RegionService,
    private professionService:ProfessionService, private sanitizer: DomSanitizer
  ){}
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
  ngOnInit(): void {
    this.url=this.route.snapshot.params['id']
    this.onGetCitoyen();
    

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

}