import { Injectable } from '@angular/core';
import {  HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apiresponse } from '../models/Apiresponse';
import { Militant } from '../models/militant'; 

@Injectable({
  providedIn: 'root'
})
export class MilitantService {

  base="http://localhost:8080"
  baseUrl=this.base+"/militants";
  urlSearch=this.base+"/searchMilitant?keyword=";


constructor(private http: HttpClient) { }

getAll(p :number, size :number):Observable<Apiresponse>{
  return this.http.get<Apiresponse>(this.baseUrl+"?sort=titre,desc&page="+p+"&size="+size);
}

getCoordinations(){
  return this.http.get<Apiresponse>(this.base+"/coordinations");
}

getDivisionsByCoordination(url : any){
  return this.http.get<Apiresponse>(url+"/divisions");
}

getAll1():Observable<Apiresponse>{
  return this.http.get<Apiresponse>(this.baseUrl+"?sort=date,desc");
}

getById(url: string):Observable<any>{
  return this.http.get<Apiresponse>(this.baseUrl+"/"+url);
}

getFileByAvancement(url: string):Observable<any>{
  return this.http.get<Apiresponse>(url);
}

search(url: string):Observable<any>{
  return this.http.get<Apiresponse>(this.urlSearch+url);
}
searchFormation(url: string):Observable<any>{
  return this.http.get<Apiresponse>(this.urlSearch+"categorie=Formation&keyword="+url);
}
searchHierachisation(url: string):Observable<any>{
  return this.http.get<Apiresponse>(this.urlSearch+"categorie=Hierachisation&keyword="+url);
}
searchAutre(url: string):Observable<any>{
  return this.http.get<Apiresponse>(this.urlSearch+"categorie=Autre&keyword="+url);
}






Create(militant : Militant):Observable<Apiresponse>{
  return this.http.post<Apiresponse>(this.baseUrl , militant);
}

Update(url: string, militant : Militant):Observable<Apiresponse>{
  return this.http.put<Apiresponse>(url, militant);
}

delete(url: string){
  return this.http.delete<Apiresponse>(this.baseUrl+"/"+url);
}


getMaxId(){
  return this.http.get<Apiresponse>(this.base+"/maxIdDoc")
}



}
