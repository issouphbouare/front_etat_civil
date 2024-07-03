import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Apiresponse } from '../models/Apiresponse';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';
import { VariableGService } from './variable-g.service';

@Injectable({
  providedIn: 'root'
})
export class JasperService {
  base=this.variableGService.getApi(); /*connexion au serveur distant*/
baseUrl=this.base+"/api/jasper";
  


constructor(private http: HttpClient, private variableGService: VariableGService,
   private tokenStorageService: TokenStorageService) { }

getCarteById(url:any):Observable<any>{
  const headers = this.tokenStorageService.getHeaders();
  return this.http.get<Apiresponse>(this.baseUrl+"/carte/"+url,{ headers } );
}


generateRecu(id: number): Observable<Blob> {
  const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.tokenStorageService.getToken())
    .set('Content-Type', 'application/pdf'); // Remplacez 'application/pdf' par le type MIME approprié si nécessaire

  const url = `${this.baseUrl}/recu/${id}`;
  return this.http.get(url, { responseType: 'blob', headers: headers });
}

generateCarte(id: number): Observable<Blob> {
  const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.tokenStorageService.getToken())
    .set('Content-Type', 'application/pdf'); // Remplacez 'application/pdf' par le type MIME approprié si nécessaire

  const url = `${this.baseUrl}/carte/${id}`;
  return this.http.get(url, { responseType: 'blob', headers: headers });
}

generateFiche(id: number): Observable<Blob> {
  const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.tokenStorageService.getToken())
    .set('Content-Type', 'application/pdf'); // Remplacez 'application/pdf' par le type MIME approprié si nécessaire

  const url = `${this.baseUrl}/fiche/${id}`;
  return this.http.get(url, { responseType: 'blob', headers: headers });
}

generateNationalite(id: number): Observable<Blob> {
  const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.tokenStorageService.getToken())
    .set('Content-Type', 'application/pdf'); // Remplacez 'application/pdf' par le type MIME approprié si nécessaire

  const url = `${this.baseUrl}/nationalite/${id}`;
  return this.http.get(url, { responseType: 'blob', headers: headers });
}

public downloadFile(blob: Blob, name: any): void {
  const downloadLink = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download =name+".pdf"; // Nom du fichier
  document.body.appendChild(downloadLink);
  downloadLink.click();
  setTimeout(() => {
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(url);
  }, 100);
}

}
