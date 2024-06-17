import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CercleService } from 'src/app/services/cercle.service';
import { CitoyenService } from 'src/app/services/citoyen.service';
import { CommuneService } from 'src/app/services/commune.service';
import { ProfessionService } from 'src/app/services/profession.service';
import { RegionService } from 'src/app/services/region.service';
import { VqfService } from 'src/app/services/vqf.service';
import { JasperService } from 'src/app/services/jasper.service';

@Component({
  selector: 'app-add-citoyen',
  templateUrl: './add-citoyen.component.html',
  styleUrls: ['./add-citoyen.component.css']
})
export class AddCitoyenComponent implements OnInit {
  base = "https://synefct.org/api"; /*connexion au serveur distant*/



  selectedFiles?: FileList;
  currentFile?: File;
  isMali:boolean=true
  isMaliA:boolean=true
  etape1: boolean = false;
  etape2: boolean = false;
  etape3: boolean = false;
  etape4: boolean = false;
  etape5: boolean = false;
  etape6: boolean = false;
  afficheCom: boolean = false;
  afficheVqf: boolean = false;
  afficheComA: boolean = false;
  afficheVqfA: boolean = false;
  selectedReg: any;
  selectedProf: any;
  selectedProfP: any;
  selectedProfM: any;
  selectedCer: any;
  selectedCom: any;
  selectedVqf: any;
  selectedRegA: any;
  selectedCerA: any;
  selectedComA: any;
  selectedVqfA: any;
  professions: any;
  regions: any;
  cercles: any;
  communes: any;
  vqfAs: any;
  cercleAs: any;
  communeAs: any;
  vqfs: any;
  citoyen: any;

  prenom: String = '';
  nom: string = '';
  profession: any;
  prenomPere: string = '';
  telephone?: number;
  dateNaissance: string = '';
  region: any; cercle: any; commune: any; vqf: any;
  regionA: any; cercleA: any; communeA: any; vqfA: any;
  professionPere: any;
  prenomMere: string = '';
  nomMere: string = '';
  professionMere: any;

  rue: string = '';
  porte: string = '';
  autre: string = '';



  constructor(private formBuilder: FormBuilder,
    private apiService: CitoyenService, private route: ActivatedRoute,
    private professionService: ProfessionService,
    private regionService: RegionService, private vqfService: VqfService,
    private cercleService: CercleService, private jasperService: JasperService,
    private communeService: CommuneService, private router: Router) { }
  formAdd: FormGroup = new FormGroup({});



  ngOnInit() { this.isMali=true;  this.isMaliA=true
    this.onEtape1(); this.onGetRegions(); this.onGetProfessions();
    this.formAdd = this.formBuilder.group({
      telephone: ['', [Validators.min(50000000), Validators.max(100000000)]], prenom: ['', [Validators.required, Validators.pattern("([a-zA-Z]).{1,}")]],
      nom: ['', [Validators.required, Validators.pattern("([A-Z]){1,}")]],
      genre: ['', Validators.required],
      civilite: ['', Validators.required],
      profession: ['', Validators.required],
      dateNaissance: ['', [Validators.required, this.validateDateNaissance]],
      region: ['', Validators.required],
      cercle: ['', Validators.required],
      commune: ['', Validators.required],
      lieuNaissance: ['', Validators.required],

      regionA: ['', Validators.required],
      cercleA: ['', Validators.required],
      communeA: ['', Validators.required],
      adresse: ['', Validators.required],
      rue: [''],
      porte: [''],
      autre: [''],

      prenomPere: ['', [Validators.required, Validators.pattern("([a-zA-Z]).{1,}")]],
      prenomMere: ['', [Validators.required, Validators.pattern("([a-zA-Z]).{1,}")]],
      nomMere: ['', [Validators.required, Validators.pattern("([A-Z]){1,}")]],
      professionPere: ['', Validators.required],
      professionMere: ['', Validators.required]
    });
  }

  onGetRegions() {
    this.regionService.getRegions().subscribe((data: any) => {
      this.regions = data;
      this.sortRegions()
      console.log(this.regions);
    }, err => {
      console.log(err);
    });
  }


  onGetCerByReg() {
    this.cercleService.getCerByReg(this.selectedReg).subscribe((data: any) => {
      this.cercles = data;
      this.sortCercles();
      //if(data!=null) this.affiche=true;
      this.selectedCer = null;
      this.selectedCom = null;
      this.selectedVqf = null;
      this.afficheCom = true; this.afficheVqf = true; 
    }, err => {
      console.log(err);
    });
    console.log(this.selectedReg)
    //if(this.selectedReg===30) this.isMali=false
      this.isMali=(this.selectedReg==11)?false:true
  }

  onGetComByCer() {
    this.communeService.getComByCer(this.selectedCer).subscribe((data: any) => {
      this.communes = data;
      this.sortCommunes();
      this.selectedCom = null;
      this.selectedVqf = null;
      //if(data!=null) this.affiche=true;
      this.afficheCom = false;
    }, err => {
      console.log(err);
    });
  }

  onGetVqfByCom() {
    this.vqfService.getVqfByCom(this.selectedCom).subscribe((data: any) => {
      this.vqfs = data;
      this.sortVqfs();
      this.selectedVqf = null;
      //if(data!=null) this.affiche=true;
      this.afficheVqf = false;
    }, err => {
      console.log(err);
    });
  }

  onGetCerByRegA() {
    this.cercleService.getCerByReg(this.selectedRegA).subscribe((data: any) => {
      this.cercleAs = data;
      this.sortCercleAs();
      //if(data!=null) this.affiche=true;
      this.selectedCerA = null;
      this.selectedComA = null;
      this.selectedVqfA = null;
      this.afficheComA = true; this.afficheVqfA = true;
    }, err => {
      console.log(err);
    });
    this.isMaliA=(this.selectedRegA==11)?false:true
  }

  onGetComByCerA() {
    this.communeService.getComByCer(this.selectedCerA).subscribe((data: any) => {
      this.communeAs = data;
      this.sortCommuneAs();
      this.selectedComA = null;
      this.selectedVqfA = null;
      //if(data!=null) this.affiche=true;
      this.afficheComA = false;
    }, err => {
      console.log(err);
    });
  }

  onGetVqfByComA() {
    this.vqfService.getVqfByCom(this.selectedComA).subscribe((data: any) => {
      this.vqfAs = data;
      this.sortVqfAs();
      this.selectedVqfA = null;
      this.afficheVqfA = false;
    }, err => {
      console.log(err);
    });
  }
  // region , cercle commune vqf courant 
  onGetRegionCur() {
    this.regionService.getById(this.selectedReg).subscribe((data: any) => {
      this.region = data;
    }, err => {
      console.log(err);
    });
  }
  onGetCerCur() {
    this.cercleService.getById(this.selectedCer).subscribe((data: any) => {
      this.cercle = data;
    }, err => {
      console.log(err);
    });
  }
  onGetComCur() {
    this.communeService.getById(this.selectedCom).subscribe((data: any) => {
      this.commune = data;
      //if(data!=null) this.affiche=true;
      this.afficheVqfA = false;
    }, err => {
      console.log(err);
    });
  }
  onGetVqfCur() {
    this.vqfService.getById(this.selectedVqf).subscribe((data: any) => {
      this.vqf = data;
    }, err => {
      console.log(err);
    });
  }

  onGetRegionCurA() {
    this.regionService.getById(this.selectedRegA).subscribe((data: any) => {
      this.regionA = data;
    }, err => {
      console.log(err);
    });
  }
  onGetCerCurA() {
    this.cercleService.getById(this.selectedCerA).subscribe((data: any) => {
      this.cercleA = data;
    }, err => {
      console.log(err);
    });
  }
  onGetComCurA() {
    this.communeService.getById(this.selectedComA).subscribe((data: any) => {
      this.communeA = data;
    }, err => {
      console.log(err);
    });
  }
  onGetVqfCurA() {
    this.vqfService.getById(this.selectedVqfA).subscribe((data: any) => {
      this.vqfA = data;
      this.afficheVqfA = false;
    }, err => {
      console.log(err);
    });
  }

  onGetProfessions() {
    this.professionService.getProfessions().subscribe((data: any) => {
      this.professions = data;
      this.sortProfessions()
      console.log(this.professions);
    }, err => {
      console.log(err);
    });
  }
  sortProfessions(): void {
    this.professions.sort((a: any, b: any) => {
      return a.libelle.localeCompare(b.libelle)
    })
  }


  sortRegions(): void {
    this.regions.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
  }
  sortCercles(): void {
    this.cercles.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
  }
  sortCommunes(): void {
    this.cercles.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
  }
  sortVqfs(): void {
    this.vqfs.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
  }


  sortCercleAs(): void {
    this.cercleAs.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
  }
  sortCommuneAs(): void {
    this.communeAs.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
  }
  sortVqfAs(): void {
    this.vqfAs.sort((a: any, b: any) => {
      return a.code.localeCompare(b.code)
    })
  }

  onGetProfCur() {
    this.professionService.getById(this.selectedProf).subscribe((data: any) => {
      this.profession = data;
    }, err => {
      console.log(err);
    });
  }

  onGetProfPCur() {
    this.professionService.getById(this.selectedProfP).subscribe((data: any) => {
      this.professionPere = data;
    }, err => {
      console.log(err);
    });
  }
  onGetProfMCur() {
    this.professionService.getById(this.selectedProfM).subscribe((data: any) => {
      this.professionMere = data;
    }, err => {
      console.log(err);
    });
  }



  onSubmit() {
    this.apiService.Create(this.formAdd.value).
      subscribe(data => {
        this.citoyen = data;
        
        //this.router.navigate(['citoyens']);
        this.onEtape5()
      }, err => {
        console.log(err);
        alert(err.error.message);
      });
  }



  selectedGenre: string = '';
  optionsG: { value: string, label: string }[] = [
    { value: '', label: '' },
    { value: 'Femme', label: 'Femme' },
    { value: 'Homme', label: 'Homme' }

  ];
  onSelectionGenre() {

  }

  
  

  selectedCivilite: string = '';
  optionsCivilite = [
    { value: '', label: '' },
    { value: 'Celibataire', label: 'Celibataire' },
    { value: 'Marié(e)', label: 'Marié(e)' }
  ];

  onSelectionCivilite() {
  }


  onEtape1() { this.etape1 = true; this.etape2 = false; this.etape3 = false; this.etape4 = false; this.etape5 = false; this.etape6 = false; }
  onEtape2() { this.etape1 = false; this.etape2 = true; this.etape3 = false; this.etape4 = false; this.etape5 = false; this.etape6 = false; }
  onEtape3() { this.etape1 = false; this.etape2 = false; this.etape3 = true; this.etape4 = false; this.etape5 = false; this.etape6 = false; }
  onEtape4() { this.etape1 = false; this.etape2 = false; this.etape3 = false; this.etape4 = true; this.etape5 = false; this.etape6 = false; }
  onEtape5() { this.etape1 = false; this.etape2 = false; this.etape3 = false; this.etape4 = false; this.etape5 = true; this.etape6 = false; }
  onEtape6() {
    alert("Citoyen : " + this.citoyen.nom +
        "   " + this.citoyen.prenom +" de numero niciv "+this.citoyen.niciv+
        "  enroulé avec succès  ");
    this.router.navigate(['citoyen', this.citoyen.id]);
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
        this.jasperService.downloadFile(response, "recépissé_" + id.toString());
      },
      error => {
        console.error('Erreur lors du téléchargement du recépissé : ', error);
      }
    );
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