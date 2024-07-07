import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CercleService } from 'src/app/services/cercle.service';
import { CitoyenService } from 'src/app/services/citoyen.service';
import { CommuneService } from 'src/app/services/commune.service';
import { ProfessionService } from 'src/app/services/profession.service';
import { RegionService } from 'src/app/services/region.service';
import { VqfService } from 'src/app/services/vqf.service';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { JasperService } from 'src/app/services/jasper.service';
@Component({
  selector: 'app-edit-citoyen',
  templateUrl: './edit-citoyen.component.html',
  styleUrls: ['./edit-citoyen.component.css']
})
export class EditCitoyenComponent implements OnInit {
  base="https://synefct.org/api"; /*connexion au serveur distant*/

 

selectedFiles?: FileList;
currentFile?: File;

public url!: string;
isMali?:boolean
isMaliA?:boolean
etape1: boolean = false; 
etape2: boolean = false;
etape3: boolean = false; 
etape4: boolean = false;
etape5: boolean = false;
etape6: boolean = false;
afficheCom: boolean=false;
afficheVqf: boolean=false;
afficheComA: boolean=false;
afficheVqfA: boolean=false;
selectedReg:any;
selectedProf:any;
selectedProfP:any;
selectedProfM:any;
selectedCer:any;
selectedCom:any;
selectedVqf:any;
selectedRegA:any;
selectedCerA:any;
selectedComA:any;
selectedVqfA:any;
professions: any;
regions:any;
cercles:any;
communes:any;
vqfAs:any;
cercleAs:any;
communeAs:any;
vqfs:any;
citoyen:any;
bool : Boolean=true

//prenom: String='';
//nom: string='';
profession: any;
prenomPere: string='';
telephone?: number;
dateNaissance: string='';
region:any; cercle:any; commune:any; vqf:any;
regionA:any; cercleA:any; communeA:any; vqfA:any;
professionPere: any;
prenomMere: string='';
nomMere: string='';
professionMere: any;

rue: string='';
porte: string='';
autre: string='';
editing :string="hidden";



  constructor(private formBuilder:FormBuilder,
     private apiService: CitoyenService, private route:ActivatedRoute,
     private professionService: ProfessionService,
     private regionService: RegionService,private vqfService: VqfService,
     private cercleService: CercleService,private jasperService: JasperService,
     private communeService: CommuneService, private  router:Router) { }
    formAdd : FormGroup= new FormGroup({});
    


  ngOnInit() { this.onEtape1(); this.onGetRegions(); this.onGetProfessions();
    this.formAdd=this.formBuilder.group({
      telephone : ['',[ Validators.min(50000000), Validators.max(100000000)]],      prenom : ['',[Validators.required, Validators.pattern("([a-zA-Z]).{1,}")]],
      nom : ['',[Validators.required, Validators.pattern("([A-Z]){1,}")]],
      genre : ['',Validators.required],
      civilite : ['',Validators.required],
      profession : ['',Validators.required],
      dateNaissance : ['', [Validators.required, this.validateDateNaissance]],
      region : ['',Validators.required],
      cercle : ['',Validators.required],
      commune : ['',Validators.required],
      lieuNaissance : ['',Validators.required],

      regionA : ['',Validators.required],
      cercleA : ['',Validators.required],
      communeA : ['',Validators.required],
      adresse : ['',Validators.required],
      rue : [''],
      porte : [''],
      autre : [''],

      prenomPere : ['',[Validators.required, Validators.pattern("([a-zA-Z]).{1,}")]],
      prenomMere : ['',[Validators.required, Validators.pattern("([a-zA-Z]).{1,}")]],
      nomMere : ['',[Validators.required, Validators.pattern("([A-Z]){1,}")]],
      professionPere : ['',Validators.required],
      professionMere : ['',Validators.required]
    });
    this.url=this.route.snapshot.params['id']
    this.onGetCitoyen();
    this.isButtonEtape1()
    this.isButtonEtape2()
    this.isButtonEtape3()
    this.isButtonEtape4()
    this.editing="hidden"
    this.isMali=(this.region.id!=11)?false:true
    this.isMaliA=(this.regionA.id!=11)?false:true
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
       
  }, err=>{
    console.log(err);
  })
  }

  
  onGetLieuNaissance(id:any){
    this.vqfService.getById(id)
    .subscribe((data: any)=>{
    this.vqf=data;
    console.log(data);
    this.onGetCommune(this.vqf.commune)
  }, err=>{
    console.log(err);
  })
}
onGetAdresse(id:any){
  this.vqfService.getById(id)
  .subscribe((data: any)=>{
  this.vqfA=data;
  this.onGetCommuneA(this.vqfA.commune)
}, err=>{
  console.log(err);
})
}
onGetCommune(id:any){
  this.communeService.getById(id)
  .subscribe((data: any)=>{
  this.commune=data;
  this.selectedCom=this.commune.id
  this.onGetCercle(this.commune.cercle)
  this.onGetVqfByCom()
}, err=>{
  console.log(err);
})
}
onGetCommuneA(id:any){
this.communeService.getById(id)
.subscribe((data: any)=>{
this.communeA=data;
this.onGetCercleA(this.communeA.cercle)
this.onGetVqfByComA()
}, err=>{
console.log(err);
})
}
onGetCercle(id:any){
  this.cercleService.getById(id)
  .subscribe((data: any)=>{
  this.cercle=data;
  this.selectedCer=this.cercle.id
  this.onGetRegion(this.cercle.region)
  this.onGetComByCer()
}, err=>{
  console.log(err);
})
}
onGetCercleA(id:any){
this.cercleService.getById(id)
.subscribe((data: any)=>{
this.cercleA=data;
this.selectedCerA=this.cercleA.id
this.onGetRegionA(this.cercleA.region)
this.onGetComByCerA()
}, err=>{
console.log(err);
})
}
onGetRegion(id:any){
  this.regionService.getById(id)
  .subscribe((data: any)=>{
  this.region=data;
  this.selectedReg=this.region.id
  this.onGetCerByReg()

}, err=>{
  console.log(err);
})
}
onGetRegionA(id:any){
this.regionService.getById(id)
.subscribe((data: any)=>{
this.regionA=data;
this.onGetCerByRegA()
}, err=>{
console.log(err);
})
}
onGetProfession(id:any){
  this.professionService.getById(id)
  .subscribe((data: any)=>{
  this.profession=data;
  this.selectedProf=this.profession.id
}, err=>{
  console.log(err);
})
}
onGetProfessionP(id:any){
this.professionService.getById(id)
.subscribe((data: any)=>{
this.professionPere=data;
this.selectedProfP=this.professionPere.id
}, err=>{
console.log(err);
})
}
onGetProfessionM(id:any){
  this.professionService.getById(id)
  .subscribe((data: any)=>{
  this.professionMere=data;
  this.selectedProfM=this.professionMere.id

}, err=>{
  console.log(err);
})
}

  onGetRegions(){
    this.regionService.getRegions().subscribe((data: any)=>{
      this.regions=data;
      this.sortRegions()
        console.log(this.regions);
        }, err=>{
            console.log(err);
          }); 
   }
 
   
   onGetCerByReg(){      
     this.cercleService.getCerByReg(this.region.id).subscribe((data: any)=>{
       this.cercles=data; 
       this.sortCercles();
       if(this.region.id!=this.cercle.region) {
       this.cercle.id=null;
       this.commune.id=null;
       this.vqf.id=null;  
       this.afficheCom=true; this.afficheVqf=true;
      }  
      this.isMali=(this.region.id!=11)?false:true      
         }, err=>{
             console.log(err);
           }); 
    }

    onGetComByCer(){      
     this.communeService.getComByCer(this.cercle.id).subscribe((data: any)=>{
       this.communes=data; 
       this.sortCommunes();
       if(this.cercle.id!=this.commune.cercle){
        this.commune.id=null;
        this.vqf.id=null;
        this.afficheVqf=true;
       }this.afficheCom=false;
       
        
         }, err=>{
             console.log(err);
           }); 
    }

    onGetVqfByCom(){  
     this.vqfService.getVqfByCom(this.commune.id).subscribe((data: any)=>{
       this.vqfs=data;
       this.sortVqfs();
       if(this.commune.id!=this.vqf.commune){
        this.vqf.id=null;
       }this.afficheVqf=false;
       
       
         }, err=>{
             console.log(err);
           }); 
    }

    onGetCerByRegA(){      
      this.cercleService.getCerByReg(this.regionA.id).subscribe((data: any)=>{
        this.cercleAs=data; 
        this.sortCercleAs();
        if(this.regionA.id!=this.cercleA.region) {
        this.cercleA.id=null;
        this.communeA.id=null;
        this.vqfA.id=null;  
        this.afficheComA=true; this.afficheVqfA=true;
        
       }     
       this.isMaliA=(this.regionA.id!=11)?false:true   
          }, err=>{
              console.log(err);
            }); 
     }
 
     onGetComByCerA(){      
      this.communeService.getComByCer(this.cercleA.id).subscribe((data: any)=>{
        this.communeAs=data; 
        this.sortCommuneAs();
        if(this.cercleA.id!=this.communeA.cercle){
         this.communeA.id=null;
         this.vqfA.id=null;
         this.afficheVqfA=true;
        } this.afficheComA=false;
        
         
          }, err=>{
              console.log(err);
            }); 
     }
 
     onGetVqfByComA(){  
      this.vqfService.getVqfByCom(this.communeA.id).subscribe((data: any)=>{
        this.vqfAs=data;
        this.sortVqfAs();
        if(this.communeA.id!=this.vqfA.commune){
         this.vqfA.id=null;
        }this.afficheVqfA=false;
        
        
          }, err=>{
              console.log(err);
            }); 
     }
 
// region , cercle commune vqf courant 
onGetRegionCur(){
  this.regionService.getById(this.selectedReg).subscribe((data: any)=>{
    this.region=data;
      }, err=>{
          console.log(err);
        });
 }
 onGetCerCur(){
  this.cercleService.getById(this.selectedCer).subscribe((data: any)=>{
    this.cercle=data;
      }, err=>{
          console.log(err);
        });
 }
 onGetComCur(){
  this.communeService.getById(this.selectedCom).subscribe((data: any)=>{
    this.commune=data;
    //if(data!=null) this.affiche=true;
    this.afficheVqfA=false;
      }, err=>{
          console.log(err);
        });
 }
     onGetVqfCur(){
      this.vqfService.getById(this.selectedVqf).subscribe((data: any)=>{
        this.vqf=data;
          }, err=>{
              console.log(err);
            });
     }

     onGetRegionCurA(){
      this.regionService.getById(this.selectedRegA).subscribe((data: any)=>{
        this.regionA=data;
          }, err=>{
              console.log(err);
            });
     }
     onGetCerCurA(){
      this.cercleService.getById(this.selectedCerA).subscribe((data: any)=>{
        this.cercleA=data;
          }, err=>{
              console.log(err);
            });
     }
     onGetComCurA(){
      this.communeService.getById(this.selectedComA).subscribe((data: any)=>{
        this.communeA=data;
          }, err=>{
              console.log(err);
            });
     }
     onGetVqfCurA(){
      this.vqfService.getById(this.selectedVqfA).subscribe((data: any)=>{
        this.vqfA=data;
        this.afficheVqfA=false;
          }, err=>{
              console.log(err);
            });
     }

     onGetProfessions(){
      this.professionService.getProfessions().subscribe((data: any)=>{
        this.professions=data;
        this.sortProfessions()
          console.log(this.professions);
          }, err=>{
              console.log(err);
            }); 
     }
     sortProfessions(): void{
      this.professions.sort((a: any, b: any) => {
        return a.libelle.localeCompare(b.libelle)
      })
     }

    
     sortRegions(): void{
      this.regions.sort((a: any, b: any) => {
        return a.code.localeCompare(b.code)
      })
     }
     sortCercles(): void{
      this.cercles.sort((a: any, b: any) => {
        return a.code.localeCompare(b.code)
      })
     }
     sortCommunes(): void{
      this.cercles.sort((a: any, b: any) => {
        return a.code.localeCompare(b.code)
      })
     }
     sortVqfs(): void{
      this.vqfs.sort((a: any, b: any) => {
        return a.code.localeCompare(b.code)
      })
     }

     
     sortCercleAs(): void{
      this.cercleAs.sort((a: any, b: any) => {
        return a.code.localeCompare(b.code)
      })
     }
     sortCommuneAs(): void{
      this.communeAs.sort((a: any, b: any) => {
        return a.code.localeCompare(b.code)
      })
     }
     sortVqfAs(): void{
      this.vqfAs.sort((a: any, b: any) => {
        return a.code.localeCompare(b.code)
      })
     }

     onGetProfCur(){
      this.professionService.getById(this.selectedProf).subscribe((data: any)=>{
        this.profession=data;
          }, err=>{
              console.log(err);
            });
     }

     onGetProfPCur(){
      this.professionService.getById(this.selectedProfP).subscribe((data: any)=>{
        this.professionPere=data;
          }, err=>{
              console.log(err);
            });
     }
     onGetProfMCur(){
      this.professionService.getById(this.selectedProfM).subscribe((data: any)=>{
        this.professionMere=data;
          }, err=>{
              console.log(err);
            });
     }
 
   

  onSubmit(){
  this.apiService.Update(this.citoyen.id,this.formAdd.value).
  subscribe( data => {
    this.citoyen=data;
      alert("Citoyen : " + this.citoyen.nom +
      "   " + this.citoyen.prenom +" de numero niciv "+this.citoyen.niciv+
      "  modifié avec succès  "); 
      this.router.navigate(['citoyen',this.citoyen.id]);
      //this.onEtape5()
    },err=>{
      console.log(err);
      alert("Ce numéro de téléphone existe déjà");
      //alert(err.error.message);
    }); 
}


   
   selectedGenre: string='';
   optionsG: { value: string, label: string }[] = [
     { value: '', label: '' },
     { value: 'Femme', label: 'Femme' },
     { value: 'Homme', label: 'Homme' }
     
   ];
   onSelectionGenre() {
     
   }
   selectedCivilite: string='';
   optionsCivilite = [
    { value: '', label: '' },
    { value: 'Celibataire', label: 'Celibataire' },
    { value: 'Marié(e)', label: 'Marié(e)' }
  ];
  
   onSelectionCivilite() {
   }
   
           
   onEtape1(){this.etape1=true; this.etape2=false; this.etape3=false; this.etape4=false;this.etape5=false; this.etape6=false;}
   onEtape2(){this.etape1=false; this.etape2=true; this.etape3=false; this.etape4=false;this.etape5=false;this.etape6=false;}
   onEtape3(){this.etape1=false; this.etape2=false; this.etape3=true; this.etape4=false;this.etape5=false;this.etape6=false;}
   onEtape4(){this.etape1=false; this.etape2=false; this.etape3=false; this.etape4=true;this.etape5=false;this.etape6=false;}
   onEtape5(){this.etape1=false; this.etape2=false; this.etape3=false; this.etape4=false;this.etape5=true;this.etape6=false;}
   onEtape6(){ 
    this.router.navigate(['citoyen',this.citoyen.id]);
    this.generateRecu(this.citoyen.id)
    }





  

 //Validation de la date de naissaince
   validateDateNaissance(control: any): { [key: string]: any } | null {
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

  generateRecu(id: number): void {
    this.jasperService.generateRecu(id).subscribe(
      (response: Blob) => {
        this.jasperService.downloadFile(response, "recépissé_"+id.toString());
      },
      error => {
        console.error('Erreur lors du téléchargement du recépissé : ', error);
      }
    ); 
  }

  isButtonEtape1(): boolean {
    return !this.formAdd.controls['telephone'].valid
      || !this.formAdd.controls['genre'].valid
      || !this.formAdd.controls['civilite'].valid
      || !this.formAdd.controls['prenom'].valid
      || !this.formAdd.controls['nom'].valid
      || !this.formAdd.controls['profession'].valid;
  }
  isButtonEtape2(): boolean {
    return !this.formAdd.controls['prenomPere'].valid
    || !this.formAdd.controls['professionPere'].valid
    || !this.formAdd.controls['prenomMere'].valid
    || !this.formAdd.controls['nomMere'].valid
    || !this.formAdd.controls['professionMere'].valid;
  }
  isButtonEtape3(): boolean {
    return !this.formAdd.controls['dateNaissance'].valid
    || !this.formAdd.controls['region'].valid
    || !this.formAdd.controls['cercle'].valid
    || !this.formAdd.controls['commune'].valid
    || !this.formAdd.controls['lieuNaissance'].valid
  }
  isButtonEtape4(): boolean {
    return !this.formAdd.controls['rue'].valid
    || !this.formAdd.controls['porte'].valid
    || !this.formAdd.controls['autre'].valid
    || !this.formAdd.controls['regionA'].valid
    || !this.formAdd.controls['cercleA'].valid
    || !this.formAdd.controls['communeA'].valid
    || !this.formAdd.controls['adresse'].valid
  }
  onEditing(){
    this.editing="date"
  }
  noEditing(){
    this.editing="hidden"
  }
  /* private trigger: Subject<void> = new Subject<void>();
  public triggerObservable: Observable<void> = this.trigger.asObservable();

  public webcamImage: WebcamImage | undefined;

  // Déclenche la capture de la photo
  takePhoto() {
    this.trigger.next();
  }

  // Gère l'image capturée
  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    console.log('Photo capturée:', webcamImage);
  }

  // Gère les erreurs d'initialisation
  handleInitError(error: WebcamInitError) {
    console.error('Erreur d\'initialisation de la webcam:', error);
  }
   */
  
}
