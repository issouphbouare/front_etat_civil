import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apiresponse } from '../models/Apiresponse';
import { Observable } from 'rxjs';
import { Actualite } from '../models/actualite';

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {
  base="http://localhost:8081"
  baseUrl=this.base+"/actualites";

  urlImageTitre=this.base+"/get/imageTitre/";
  urlImage=this.base+"/get/image/";
  
  
  //baseUrl="https://gestiseance.herokuapp.com/matieres"; /*connexion au serveur distant*/


  constructor(private http: HttpClient) { }

  getActualites(p :number, size :number):Observable<Apiresponse>{
    return this.http.get<Apiresponse>(this.baseUrl+"?sort=id,desc&page="+p+"&size="+size);
  }

  getAll():Observable<Apiresponse>{
    return this.http.get<Apiresponse>(this.baseUrl+"?sort=id,desc");
  }

  getActualiteById(url: string):Observable<any>{
    return this.http.get<Apiresponse>(url);
  }
  

  CreateActualite(actualite : Actualite):Observable<Apiresponse>{
    return this.http.post<Apiresponse>(this.baseUrl , actualite);
  }

  UpdateActualite(url: string, actualite : Actualite):Observable<Apiresponse>{
    return this.http.put<Apiresponse>(url, actualite);
  }

  getMaxId(){
    return this.http.get<Apiresponse>(this.base+"/maxIdAv")
  }

  deleteActualite(url: string){
    return this.http.delete<Apiresponse>(url);
  }

  getImagesActualite(a :any):Observable<any>{ 
    return this.http.get<Apiresponse>(a+"/images");
  }

}
