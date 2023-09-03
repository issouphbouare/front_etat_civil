import { Injectable } from '@angular/core';
import {  HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Apiresponse } from '../models/Apiresponse';
import { Observable } from 'rxjs';
import { Avancement } from '../models/avancement';


@Injectable({
  providedIn: 'root'
})
export class AvancementService { 
  base="http://localhost:8080"
  baseUrl=this.base+"/avancements";
  urlDownload=this.base+"/files/";
  urlSearch=this.base+"/searchAvancement?keyword=";
  
  //baseUrl="https://gestiseance.herokuapp.com/matieres"; /*connexion au serveur distant*/


  constructor(private http: HttpClient) { }

  getAll(p :number, size :number):Observable<Apiresponse>{
    return this.http.get<Apiresponse>(this.baseUrl+"?sort=titre,desc&page="+p+"&size="+size);
  }

  getAll1():Observable<Apiresponse>{
    return this.http.get<Apiresponse>(this.baseUrl+"?sort=date,desc");
  }

  getById(url: string):Observable<any>{
    return this.http.get<Apiresponse>(url);
  }

  search(url: string):Observable<any>{
    return this.http.get<Apiresponse>(this.urlSearch+url);
  }

  getFile(url: any):Observable<any>{
    return this.http.get<Apiresponse>(this.baseUrl+"/"+url+"/fileDBs");
  }

  
  

  Create(avancement : Avancement):Observable<Apiresponse>{
    return this.http.post<Apiresponse>(this.baseUrl , avancement);
  }

  Update(url: string, publication : Avancement):Observable<Apiresponse>{
    return this.http.put<Apiresponse>(url, publication);
  }

  delete(url: string){
    return this.http.delete<Apiresponse>(this.baseUrl+"/"+url);
  }
  getMaxId(){
    return this.http.get<Apiresponse>(this.base+"/maxIdAv")
  }

  upload(file: File, id:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.base}/upload/`+id, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

}
