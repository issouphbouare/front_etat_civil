import { Injectable } from '@angular/core';
import { Apiresponse } from '../models/Apiresponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VariableGService } from './variable-g.service';
import { TokenStorageService } from './token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class CondamnationService {
  base=this.variableGService.getApi(); /*connexion au serveur distant*/
  baseUrl=this.base+"/api/condamnation";
    
  
  
  constructor(private http: HttpClient, private variableGService: VariableGService,
    private tokenStorageService: TokenStorageService) { }
  
    search(keyword: string, page: number, size: number): Observable<Apiresponse> {
      const headers = this.tokenStorageService.getHeaders();
      return this.http.get<Apiresponse>(this.baseUrl + "/search?keyword=" + keyword +"&page="+page+"&size=" + size, { headers });
    }
  
  getCondamnations():Observable<Apiresponse>{
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
  
  
}

