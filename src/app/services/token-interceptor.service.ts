import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: TokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken(); // Récupérer le token

    // Ajouter le token à l'en-tête de la requête
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(clonedReq).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            // Vérifier le statut de la réponse et l'expiration du token
            if (event.status === 401) { // Si le token est expiré
              this.authService.signOut(); // Déconnecter l'utilisateur
            }
          }
        },
        error: (error) => {
          if (error.status === 401) {
            this.authService.signOut(); // Déconnecter l'utilisateur
          }
        },
      })
    );
  }
}
