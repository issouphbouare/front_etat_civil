import { Injectable } from '@angular/core';
import {  HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Apiresponse } from '../models/Apiresponse';
import { Observable } from 'rxjs';
import { Document } from '../models/document';


@Injectable({
  providedIn: 'root'
})
export class DocumentService { 
  base="https://synefct.org/api"; /*connexion au serveur distant*/
  //base="http://localhost:8082"
  baseUrl=this.base+"/file";
  urlDownload=this.base+"/filedownload";
  urlUpload=this.base+"/fileupload";
  urlSearch=this.base+"/search";

  constructor(private http: HttpClient) { }

  getAll(p :number, size :number):Observable<Apiresponse>{
    return this.http.get<Apiresponse>(this.baseUrl+"?sort=titre,desc&page="+p+"&size="+size);
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

  searchAvancement(url: string):Observable<any>{
    console.log(this.urlSearch+"A?keyword="+url)
    return this.http.get<Apiresponse>(this.urlSearch+"A?keyword="+url);
  }
  searchIntegration(url: string):Observable<any>{
    return this.http.get<Apiresponse>(this.urlSearch+"I?keyword="+url);
  }
  searchFormation(url: string):Observable<any>{
    return this.http.get<Apiresponse>(this.urlSearch+"F?keyword="+url);
  }
  searchHierachisation(url: string):Observable<any>{
    return this.http.get<Apiresponse>(this.urlSearch+"H?keyword="+url);
  }
  searchAutre(url: string):Observable<any>{
    return this.http.get<Apiresponse>(this.urlSearch+"Autre?keyword="+url);
  }

  getFile(url: any):Observable<any>{
    return this.http.get<Apiresponse>(this.baseUrl+"/"+url+"/fileDBs");
  }

  
  

  Create(document : Document):Observable<Apiresponse>{
    return this.http.post<Apiresponse>(this.baseUrl , document);
  }

  Update(url: string, document : Document):Observable<Apiresponse>{
    return this.http.put<Apiresponse>(url, document);
  }

  delete(url: string){
    return this.http.delete<Apiresponse>(this.base+url);
  }

  deleteFile(url: string){
    return this.http.delete<Apiresponse>(url);
  }
  getMaxId(){
    return this.http.get<Apiresponse>(this.base+"/maxIdDoc")
  }

  upload(file: File, url:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.base}/fileupload`+url, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  

}
