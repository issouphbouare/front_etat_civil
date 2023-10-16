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
  base="https://synefct.org/api"; /*connexion au serveur distant*/
  //base="http://localhost:8082"
  baseUrl=this.base+"/militants";
  UrlUpProfil=this.base+"/upateProfil/";
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
  console.log(this.base+"/coordinations/"+url+"/divisions")
  return this.http.get<Apiresponse>(this.base+"/coordinations/"+url+"/divisions");
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
  return this.http.put<Apiresponse>(this.baseUrl+"/"+url, militant);
}

UpdateProfil(url: string, militant : Militant):Observable<Apiresponse>{
  return this.http.put<Apiresponse>(this.UrlUpProfil+url, militant);
}

delete(url: string){
  return this.http.delete<Apiresponse>(this.baseUrl+"/"+url);
}
getMilitantTotal(){
  return this.http.get<Apiresponse>(this.base+"/totalInscrit")
}

getMaxId(){
  return this.http.get<Apiresponse>(this.base+"/maxIdDoc")
}
getTotalSearch(url : string){
  return this.http.get<Apiresponse>(this.urlSearchTotal+url);
}

getDivCur(url: string):Observable<any>{
  console.log(this.baseUrl+"/"+url+"/division")
  return this.http.get<Apiresponse>(this.baseUrl+"/"+url+"/division");
}
getCoorCur(url: string):Observable<any>{
  return this.http.get<Apiresponse>(this.base+"/divisions/"+url+"/coordination");
}

existByTelephone(tel: number){
  return this.http.get<Apiresponse>(this.base+"/existsByTelephone/"+tel)
}
existByMatricule(matricule: string){
  return this.http.get<Apiresponse>(this.base+"/existsByMatricule/"+matricule)
}

}
