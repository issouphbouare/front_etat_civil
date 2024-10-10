import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariableGService {
  api: string="http://localhost:8080"
  apiDist1: string="http://62.171.169.168:8080"
  apiDist: string="https://backetat-production.up.railway.app"

  constructor(private http: HttpClient) { }
  getApi(){
    return this.api;
  }
}
