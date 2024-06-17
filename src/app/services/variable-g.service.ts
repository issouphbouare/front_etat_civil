import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariableGService {
  api: string="http://localhost:8080"
  apiDist: string="https://back-etat-civil-5.onrender.com"

  constructor() { }
  getApi(){
    return this.apiDist;
  }
}
