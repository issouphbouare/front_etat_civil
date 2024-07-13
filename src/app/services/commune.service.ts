import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apiresponse } from '../models/Apiresponse'; 
import { TokenStorageService } from './token-storage.service';
import { VariableGService } from './variable-g.service';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {
base=this.variableGService.getApi(); /*connexion au serveur distant*/
baseUrl=this.base+"/api/commune";
  
constructor(private http: HttpClient, private variableGService: VariableGService,
  private tokenStorageService: TokenStorageService) { }

  search(keyword: string, page: number, size: number): Observable<Apiresponse> {
    const headers = this.tokenStorageService.getHeaders();
    return this.http.get<Apiresponse>(this.baseUrl + "/search?keyword=" + keyword +"&page="+page+"&size=" + size, { headers });
  }

  searchP(keyword: string, page: number, size: number): Observable<Apiresponse> {
    const headers = this.tokenStorageService.getHeaders();
    return this.http.get<Apiresponse>(this.baseUrl + "/searchP?keyword=" + keyword +"&page="+page+"&size=" + size, { headers });
  }

getCommunes():Observable<Apiresponse>{
  const headers = this.tokenStorageService.getHeaders();
  return this.http.get<Apiresponse>(this.baseUrl, { headers });
}

getById(url:any):Observable<any>{
  const headers = this.tokenStorageService.getHeaders();
  return this.http.get<Apiresponse>(this.baseUrl+"/"+url ,{ headers });
}


Create(m : any):Observable<Apiresponse>{
  const headers = this.tokenStorageService.getHeaders();
  return this.http.post<Apiresponse>(this.baseUrl , m,{ headers });
}

CreateP(m : any):Observable<Apiresponse>{
  const headers = this.tokenStorageService.getHeaders();
  return this.http.post<Apiresponse>(this.baseUrl+"/payes" , m,{ headers });
}

Update(url:any, m : any):Observable<Apiresponse>{
  const headers = this.tokenStorageService.getHeaders();
  return this.http.put<Apiresponse>(this.baseUrl+"/"+url, m, { headers });
}

delete(url: any){
  const headers = this.tokenStorageService.getHeaders();
  return this.http.delete<Apiresponse>(this.baseUrl+"/"+url, { headers });
}

getComByCer(url:any):Observable<any>{
  const headers = this.tokenStorageService.getHeaders();
  return this.http.get<Apiresponse>(this.baseUrl+"/getCommunesByCercle/"+url, { headers });
}

Importer(file: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', file, file.name);

  const headers = new HttpHeaders();
  // Note: Aucun besoin de définir explicitement 'Content-Type' pour FormData

  return this.http.post(`${this.baseUrl}/import`, formData);
}

}

