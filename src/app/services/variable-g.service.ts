import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariableGService {
  api: string="http://localhost:8080"
  apiDist: string="https://backetatcivil-production.up.railway.app"

  constructor() { }
  getApi(){
    return this.apiDist;
  }
}
