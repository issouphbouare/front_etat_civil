import { Injectable } from '@angular/core';
import {  HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apiresponse } from '../models/Apiresponse';
import { Militant } from '../models/militant'; 
import { VariableGlobalService } from './variable-global.service';

@Injectable({
  providedIn: 'root'
})
export class MilitantService {
  base="http://62.171.169.168:8082"; /*connexion au serveur distant*/
  //base="http://localhost:8082"
  baseUrl=this.base+"/militants";
  urlSearch=this.base+"/searchMilitant?keyword=";
  urlSearchTotal=this.base+"/totalSearch?keyword=";



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



search(url: string):Observable<any>{
  return this.http.get<Apiresponse>(this.urlSearch+url);
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
getMilitantActif(){
  return this.http.get<Apiresponse>(this.base+"/totalActif")
}

getMaxId(){
  return this.http.get<Apiresponse>(this.base+"/maxIdDoc")
}
getTotalSearch(url : string){
  return this.http.get<Apiresponse>(this.urlSearchTotal+url);
}

getDivCur(url: string):Observable<any>{
  return this.http.get<Apiresponse>(url);
}
getCoorCur(url: string):Observable<any>{
  return this.http.get<Apiresponse>(url);
}

existByTelephone(tel: number){
  return this.http.get<Apiresponse>(this.base+"/existsByTelephone/"+tel)
}
existByMatricule(matricule: string){
  return this.http.get<Apiresponse>(this.base+"/existsByMatricule/"+matricule)
}

}
