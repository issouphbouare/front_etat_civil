import { Component, HostListener, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { CitoyenService } from 'src/app/services/citoyen.service';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-webcam',
  templateUrl: './edit-webcam.component.html',
  styleUrls: ['./edit-webcam.component.css']
})
export class EditWebcamComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private apiService: CitoyenService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  id!: string; // Recevoir le NICIV du composant parent
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId!: string;
  citoyen: any;
  citoyenCur: any;
  public isMobile: boolean = window.innerWidth <= 768;

  public videoOptions: MediaTrackConstraints = {
    width: { ideal: this.isMobile ? 320 : 500 },
    height: { ideal: this.isMobile ? 240 : 480 }
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth <= 768;
    this.videoOptions.width = this.isMobile ? 320 : 500;
    this.videoOptions.height = this.isMobile ? 240 : 480;
  }
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage!: WebcamImage;
  public croppedImageUrl: string | null = null; // URL de l'image recadrée

  // Subjects for webcam
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public ngOnInit(): void {
    // Initialiser l'URL de l'image recadrée à chaque affichage du composant
    this.croppedImageUrl = null;

    // Récupérer les webcams disponibles
    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });

    // Récupérer l'ID du citoyen depuis les paramètres de la route
    this.id = this.route.snapshot.params['id'];
    this.onGetCitoyen(this.id);
  }

  onGetCitoyen(id: any): void {
    this.apiService.getById(id).subscribe(
      (data: any) => {
        this.citoyenCur = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Prendre une photo avec la webcam
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  // Gérer les erreurs d'initialisation de la webcam
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  // Recevoir l'image de la webcam
  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  // Changer de webcam
  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  // Rognage de l'image
  imageCropped(event: ImageCroppedEvent): void {
    console.log(event.blob);
    if (event.objectUrl) {
      this.croppedImageUrl = event.objectUrl;
    } else {
      console.error('L\'URL de l\'image recadrée est vide');
    }
  }

  imageLoaded(image: LoadedImage): void {
    // Show cropper
  }

  cropperReady(): void {
    // Cropper ready
  }

  loadImageFailed(): void {
    // Show message
  }

  // Envoi de l'image rognée au serveur
  public upload(): void {
    if (this.croppedImageUrl) {
      this.apiService.uploadPortrait(this.citoyenCur.niciv, this.croppedImageUrl).subscribe(
        (response) => {
          this.citoyen = response;
          console.log('Image ajoutée avec succès', this.citoyen.id);
          alert('Image ajoutée avec succès')
          this.router.navigate(['citoyen', this.citoyen.id]);
          this.croppedImageUrl = null; // Réinitialiser l'URL de l'image recadrée après l'upload
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de l\'image', error);
          this.croppedImageUrl = null; // Réinitialiser l'URL de l'image recadrée même en cas d'erreur
        }
      );
    }
  }
}
