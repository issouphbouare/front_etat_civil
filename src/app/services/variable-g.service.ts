import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariableGService {
  api: string="http://localhost:8080"
  apiDist: string="https://back-etat-civil.onrender.com"
  apiDist1: string="https://51c10e0d-25f2-4f4b-97fc-2a43387421a4-00-2nlmocefz10oj.kirk.replit.dev:8080"

  constructor() { }
  getApi(){
    return this.apiDist1;
  }
}
