import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariableGlobalService {
  baseActualite="http://localhost:8081";
  baseDocument="http://localhost:8082";
  baseMilitant="http://localhost:8080"

  constructor() { }
}
