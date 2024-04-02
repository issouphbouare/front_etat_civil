import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apiresponse } from '../models/Apiresponse'; 
import { TokenStorageService } from './token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  base="http://localhost:8080"; /*connexion au serveur distant*/
  baseUrl=this.base+"/api/auth";
    
  
  
  constructor(private http: HttpClient) { }
  
  getAll(p :number, size :number):Observable<Apiresponse>{
    return this.http.get<Apiresponse>(this.baseUrl+"?sort=code,asc&page="+p+"&size="+size);
  }
  
  getUsers():Observable<Apiresponse>{
    return this.http.get<Apiresponse>(this.baseUrl+"/users");
  }
  
  getById(url:any):Observable<any>{
    return this.http.get<Apiresponse>(this.baseUrl+"/"+url);
  }
  
  
  Create(m : any):Observable<Apiresponse>{
    return this.http.post<Apiresponse>(this.baseUrl+"/signup" , m);
  }
  
  Update(url:any, m : any):Observable<Apiresponse>{
    return this.http.put<Apiresponse>(this.baseUrl+"/"+ url, m);
  }
  
  delete(url: any){
    return this.http.delete<Apiresponse>(this.baseUrl+"/"+url);
  }
  
  }
  
  
