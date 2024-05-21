import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { CitoyenService } from 'src/app/services/citoyen.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-webcam',
  templateUrl: './edit-webcam.component.html',
  styleUrls: ['./edit-webcam.component.css']
})
export class EditWebcamComponent implements OnInit {
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService,
    private apiService: CitoyenService, private router: Router, private route: ActivatedRoute
    , private sanitizer: DomSanitizer
  ) { }

  id!: string; // Recevoir le NICIV du composant parent
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId!: string;
  citoyen: any;
  citoyenCur: any;
  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 230 },
    height: { ideal: 1024 }
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage!: WebcamImage;
  croppedImageUrl: string | null = null; // URL de l'image recadrée


  imageCropped(event: ImageCroppedEvent) {
    console.log(event.blob)
    if (event.objectUrl) {
      this.croppedImageUrl = event.objectUrl;
    } else {
      console.error('L\'URL de l\'image recadrée est vide');
    }

  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }



  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
    this.id = this.route.snapshot.params['id']
    this.onGetCitoyen(this.id)
  }

  onGetCitoyen(id:any){
    this.apiService.getById(id)
    .subscribe((data: any)=>{
    this.citoyenCur=data;
  }, err=>{
    console.log(err);
  })
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

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
  public upload(): void {
    if (this.croppedImageUrl) {

      this.apiService.uploadPortrait(this.citoyenCur.niciv, this.croppedImageUrl).subscribe(
        (response) => {
          this.citoyen = response;
          console.log('Image envoyée avec succès', this.citoyen.id)
          this.router.navigate(['citoyen', this.citoyen.id]);
        },
        (error) => console.error('Erreur lors de l\'envoi de l\'image', error)
      );
    }
  }

  /*  uploadCroppedImageToBackend() {
     if (this.croppedImageUrl) {
       const formData = new FormData();
       formData.append('file', this.img);
       const headers = new HttpHeaders({
         'Authorization': 'Bearer '+this.tokenStorageService.getToken()
       });
       // Envoyer l'URL de l'image recadrée au backend
       this.http.put<any>("http://localhost:8080/api/citoyen/uploadPortrait/"+this.niciv, formData,{ headers }).subscribe(
         (response) => {
           console.log('Image recadrée téléchargée avec succès:', response);
           // Traiter la réponse du backend si nécessaire
         },
         (error) => {
           console.error('Erreur lors du téléchargement de l\'image recadrée:', error);
           // Gérer les erreurs si nécessaire
         }
       );
     } else {
       console.error('L\'URL de l\'image recadrée est vide');
     }
   } */
}

