import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apiresponse } from '../models/Apiresponse';
import { Citoyen } from '../models/citoyen';
import { TokenStorageService } from './token-storage.service';
import { WebcamImage } from 'ngx-webcam';
import { VariableGService } from './variable-g.service';
@Injectable({
  providedIn: 'root'
})
export class CitoyenService {
  base = this.variableGService.getApi(); /*connexion au serveur distant*/
  baseUrl = this.base + "/api/citoyen";
  croppedImageUrl: string | null = null; // URL de l'image recadrée
  imageBlob!: Blob



  constructor(private http: HttpClient, private variableGService: VariableGService,
     private tokenStorageService: TokenStorageService) { }

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

  getImage(filename: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenStorageService.getToken(),
    });

    return this.http.get(this.baseUrl + "/affichePortrait/" + filename, { headers, responseType: 'blob' });
  }

    uploadPortrait(id: string, webcamImageUrl: string): Observable<any> {
      return new Observable(observer => {
        this.convertImageUrlToBlob(webcamImageUrl).then(imageBlob => {
          const formData = new FormData();
          const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.tokenStorageService.getToken()
          });
  
          formData.append('file', imageBlob, 'portrait.png');
  
          this.http.put(this.baseUrl + '/uploadPortrait/' + id, formData, { headers })
            .subscribe(response => {
              observer.next(response);
              observer.complete();
            }, error => {
              observer.error(error);
            });
        }).catch(error => {
          observer.error(error);
        });
      });
    }
  
    private convertImageUrlToBlob(imageUrl: string): Promise<Blob> {
      return fetch(imageUrl)
        .then(response => response.blob());
    }
  
}

