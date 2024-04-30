import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Route } from '@angular/router';
import { CitoyenService } from 'src/app/services/citoyen.service';
import { VqfService } from 'src/app/services/vqf.service';

@Component({
  selector: 'app-citoyen',
  templateUrl: './citoyen.component.html',
  styleUrls: ['./citoyen.component.css']
})
export class CitoyenComponent implements OnInit {
  constructor(private route: ActivatedRoute, private apiService: CitoyenService,
    private vqfService:VqfService, private sanitizer: DomSanitizer
  ){}
  imageUrl: SafeUrl | null = null;
  public citoyen:any;
  public url!: string;
  public lieuNaissance:any;
  ngOnInit(): void {
    this.url=this.route.snapshot.params['id']
    this.onGetCitoyen();
    

  }

  onGetCitoyen(){
    this.apiService.getById(this.url)
    .subscribe((data: any)=>{
    
    this.citoyen=data;
       this.onGetLieuNaissance(this.citoyen.lieuNaissance)
       this.loadImage()
  }, err=>{
    console.log(err);
  })
  }

  onGetLieuNaissance(id:any){this.vqfService.getById(id)
    .subscribe((data: any)=>{
    
    this.lieuNaissance=data;
       this.onGetLieuNaissance(this.citoyen.lieuNaissance)
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
