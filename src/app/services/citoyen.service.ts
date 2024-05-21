import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apiresponse } from '../models/Apiresponse';
import { Citoyen } from '../models/citoyen';
import { TokenStorageService } from './token-storage.service';
import { WebcamImage } from 'ngx-webcam';
@Injectable({
  providedIn: 'root'
})
export class CitoyenService {
  base = "http://localhost:8080"; /*connexion au serveur distant*/
  baseUrl = this.base + "/api/citoyen";
  croppedImageUrl: string | null = null; // URL de l'image recadrée
  imageBlob!: Blob



  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  search(keyword: string, page: number, size: number): Observable<Apiresponse> {
    const headers = this.tokenStorageService.getHeaders();
    return this.http.get<Apiresponse>(this.baseUrl + "/search?keyword=" + keyword +"&page="+page+"&size=" + size, { headers });
  }

  getCitoyens(): Observable<Apiresponse> {
    const headers = this.tokenStorageService.getHeaders();
    return this.http.get<Apiresponse>(this.baseUrl, { headers });
  }

  getById(url: any): Observable<any> {
    const headers = this.tokenStorageService.getHeaders();
    return this.http.get<Apiresponse>(this.baseUrl + "/" + url, { headers });
  }


  Create(m: any): Observable<Apiresponse> {
    const headers = this.tokenStorageService.getHeaders();
    return this.http.post<Apiresponse>(this.baseUrl, m, { headers });
  }

  Update(url: any, m: any): Observable<Apiresponse> {
    const headers = this.tokenStorageService.getHeaders();
    return this.http.put<Apiresponse>(this.baseUrl + "/" + url, m, { headers });
  }

  delete(url: any) {
    const headers = this.tokenStorageService.getHeaders();
    return this.http.delete<Apiresponse>(this.baseUrl + "/" + url, { headers });
  }

  uploadPortrait(id: string, webcamImage: string): Observable<any> {
    const formData = new FormData();
    this.croppedImageUrl = webcamImage;
    this.convertImageUrlToBlob()
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenStorageService.getToken()
    });
    formData.append('file', this.imageBlob);

    return this.http.put(this.baseUrl + '/uploadPortrait/' + id, formData, { headers })
  }

  getImage(filename: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenStorageService.getToken(),
    });

    return this.http.get(this.baseUrl + "/affichePortrait/" + filename, { headers, responseType: 'blob' });
  }


  convertImageUrlToBlob() {
    if (this.croppedImageUrl) {
      fetch(this.croppedImageUrl)
        .then(response => response.blob())
        .then(blob => {
          // Faites quelque chose avec le blob, par exemple, l'envoyer au backend
          console.log("Blob créé avec succès :", blob);
          this.imageBlob = blob;
        })
        .catch(error => {
          console.error("Erreur lors de la création du blob :", error);
        });
    } else {
      console.warn("L'URL de l'image rognée est null.");
    }
  }
}

