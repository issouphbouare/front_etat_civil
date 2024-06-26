import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenStorage.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token has expired or is invalid
          this.tokenStorage.signOut(); // Clear token and user information
          this.router.navigate(['login']); // Redirect to login page
        }
        return throwError(error);
      })
    );
  }
}
