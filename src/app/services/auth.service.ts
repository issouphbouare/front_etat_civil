import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VariableGService } from './variable-g.service';

//const AUTH_API = 'http://localhost:8080/api/auth/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private variableGService: VariableGService) { }

  base=this.variableGService.getApi()
  baseUrl=this.base+"/api/auth";

  login(m : any): Observable<any> {
    return this.http.post(this.baseUrl + '/signin',m);
    
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + '/signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  
}
