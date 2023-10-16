import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apiresponse } from '../models/Apiresponse';
import { Observable } from 'rxjs';
import { Actualite } from '../models/actualite';

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {

  base="https://synefct.org/api"; /*connexion au serveur distant*/

  //base="http://localhost:8082"
  baseUrl=this.base+"/actualites";

  urlImageTitre=this.base+"/get/imageTitre/";
  urlImage=this.base+"/get/image/";
  
  
  

  constructor(private http: HttpClient) { }

  getActualites(p :number, size :number):Observable<Apiresponse>{
    return this.http.get<Apiresponse>(this.baseUrl+"?sort=id,desc&page="+p+"&size="+size);
  }

  getAll():Observable<Apiresponse>{
    return this.http.get<Apiresponse>(this.baseUrl+"?sort=id,desc");
  }

  getActualiteById(url: string):Observable<any>{
    return this.http.get<Apiresponse>(this.baseUrl+"/"+url);
  }
  

  CreateActualite(actualite : Actualite):Observable<Apiresponse>{
    return this.http.post<Apiresponse>(this.baseUrl , actualite);
  }

  UpdateActualite(url: string, actualite : Actualite):Observable<Apiresponse>{
    return this.http.put<Apiresponse>(this.baseUrl+"/"+url, actualite);
  }

  getMaxId(){
    return this.http.get<Apiresponse>(this.base+"/maxIdAv")
  }

  deleteActualite(url: string){
    return this.http.delete<Apiresponse>(this.baseUrl+"/"+url);
  }

  getImagesActualite(a :any):Observable<any>{ 
    return this.http.get<Apiresponse>(this.baseUrl+"/"+a+"/images");
  }

}
