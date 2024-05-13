import {Component, Input, OnInit} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { CitoyenService } from 'src/app/services/citoyen.service';
import { HttpClient} from '@angular/common/http';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { JasperService } from 'src/app/services/jasper.service';
@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService,
    private apiService:CitoyenService, private  router:Router, private  jasperService:JasperService
  ) { }
  
  @Input() niciv!: string; // Recevoir le NICIV du composant parent
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId!: string;
  citoyen :any;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

    // latest snapshot
    public webcamImage!: WebcamImage ;
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
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
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

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
  public upload(): void {
    if (this.croppedImageUrl) {
      
      this.apiService.uploadPortrait(this.niciv, this.croppedImageUrl).subscribe(
        (response) =>{
          this.citoyen=response;
          console.log('Image envoyée avec succès', this.citoyen.id)
          
          this.router.navigate(['citoyen',this.citoyen.id]);
          this.generateRecu(this.citoyen.id)
        } ,
        (error) => console.error('Erreur lors de l\'envoi de l\'image', error)
      );
    }
  }

  generateRecu(id: number): void {
    this.jasperService.generateRecu(id).subscribe(
      (response: Blob) => {
        this.jasperService.downloadFile(response,id);
      },
      error => {
        console.error('Erreur lors du téléchargement du recu : ', error);
      }
    ); 
  }
}
