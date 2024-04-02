import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apiresponse } from '../models/Apiresponse'; 
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {
base="http://localhost:8080"; /*connexion au serveur distant*/
baseUrl=this.base+"/api/commune";
  
constructor(private http: HttpClient,
  private tokenStorageService: TokenStorageService) { }



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



}

