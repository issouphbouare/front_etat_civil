import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apiresponse } from '../models/Apiresponse';
@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  base="http://62.171.169.168:8082"; /*connexion au serveur distant*/
  baseUrl=this.base+"/divisions";
    
  
  constructor(private http: HttpClient) { }
  
  getAll(p :number, size :number):Observable<Apiresponse>{
    return this.http.get<Apiresponse>(this.baseUrl+"?sort=nom,asc&page="+p+"&size="+size);
  }
  
  /* getAll():Observable<Apiresponse>{
    return this.http.get<Apiresponse>(this.baseUrl+"?sort=nom,asc");
  } */
  
  getById(url:any):Observable<any>{
    return this.http.get<Apiresponse>(url);
  }
  
  
  Create(m : any):Observable<Apiresponse>{
    return this.http.post<Apiresponse>(this.baseUrl , m);
  }
  
  Update(url:any, m : any):Observable<Apiresponse>{
    return this.http.put<Apiresponse>(url, m);
  }
  
  delete(url: any){
    return this.http.delete<Apiresponse>(url);
  }

  getDivByCoor(url:any):Observable<any>{
    return this.http.get<Apiresponse>(url);
  }

  getCoor(url:any):Observable<any>{
    return this.http.get<Apiresponse>(url);
  
  }
}
  
  