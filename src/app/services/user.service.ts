import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apiresponse } from '../models/Apiresponse'; 
import { TokenStorageService } from './token-storage.service';
import { VariableGService } from './variable-g.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  //base="http://localhost:8080"; /*connexion au serveur distant*/
  base=this.variableGService.getApi()
  baseUrl=this.base+"/api/auth";
    
  
  
  constructor(private http: HttpClient, private variableGService: VariableGService) { }
  
  search(keyword: string, page: number, size: number): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(this.baseUrl + "/search?keyword=" + keyword +"&page="+page+"&size=" + size);
  }
  
  getAll(p :number, size :number):Observable<Apiresponse>{
    return this.http.get<Apiresponse>(this.baseUrl+"?sort=code,asc&page="+p+"&size="+size);
  }
  
  getUsers():Observable<Apiresponse>{
    return this.http.get<Apiresponse>(this.baseUrl+"/users");
  }
  
  getById(url:any):Observable<any>{
    return this.http.get<Apiresponse>(this.baseUrl+"/user/"+url);
  }

  getByUsername(username:any):Observable<any>{
    return this.http.get<Apiresponse>(this.baseUrl+"/userByName/"+username);
  }
  
  
  Create(m : any):Observable<Apiresponse>{
    return this.http.post<Apiresponse>(this.baseUrl+"/signup" , m);
  }
  
  AddRole(url:any, roleName : any, m:any):Observable<Apiresponse>{
    return this.http.post<Apiresponse>(this.baseUrl+"/"+url+"/roles?roleName="+roleName, m);
  }

  DeleteRole(url:any, roleName : any):Observable<Apiresponse>{
    return this.http.delete<Apiresponse>(this.baseUrl+"/"+url+"/roles?roleName="+roleName);
  }

  Update(url:any, m : any):Observable<Apiresponse>{
    return this.http.put<Apiresponse>(this.baseUrl+"/user/"+ url, m);
  }

  UpdatePassword(url:any, m : any):Observable<Apiresponse>{
    return this.http.put<Apiresponse>(this.baseUrl+"/editPassword/"+ url, m);
  }
  
  delete(url: any){
    return this.http.delete<Apiresponse>(this.baseUrl+"/users/"+url);
  }
  
  }
  
  
