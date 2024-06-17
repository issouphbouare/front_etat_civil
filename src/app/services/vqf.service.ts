import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apiresponse } from '../models/Apiresponse'; 
import { TokenStorageService } from './token-storage.service';
import { VariableGService } from './variable-g.service';

@Injectable({
  providedIn: 'root'
})
export class VqfService {
base=this.variableGService.getApi(); /*connexion au serveur distant*/
baseUrl=this.base+"/api/vqf";
  


constructor(private http: HttpClient, private variableGService: VariableGService,
  private tokenStorageService: TokenStorageService) { }

  search(keyword: string, page: number, size: number): Observable<Apiresponse> {
    const headers = this.tokenStorageService.getHeaders();
    return this.http.get<Apiresponse>(this.baseUrl + "/search?keyword=" + keyword +"&page="+page+"&size=" + size, { headers });
  }

  searchV(keyword: string, page: number, size: number): Observable<Apiresponse> {
    const headers = this.tokenStorageService.getHeaders();
    return this.http.get<Apiresponse>(this.baseUrl + "/searchVille?keyword=" + keyword +"&page="+page+"&size=" + size, { headers });
  }

getVqfs():Observable<Apiresponse>{
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

CreateV(m : any):Observable<Apiresponse>{
  const headers = this.tokenStorageService.getHeaders();
  return this.http.post<Apiresponse>(this.baseUrl+"/ville" , m,{ headers });
}

Update(url:any, m : any):Observable<Apiresponse>{
  const headers = this.tokenStorageService.getHeaders();
  return this.http.put<Apiresponse>(this.baseUrl+"/"+url, m, { headers });
}

delete(url: any){
  const headers = this.tokenStorageService.getHeaders();
  return this.http.delete<Apiresponse>(this.baseUrl+"/"+url, { headers });
}

getVqfByCom(url:any):Observable<any>{
  const headers = this.tokenStorageService.getHeaders();
  return this.http.get<Apiresponse>(this.baseUrl+"/getVqfsByCommune/"+url, { headers });
}



}

