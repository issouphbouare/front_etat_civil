import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class VariableGlobal {

    // Voir L'api rest Synefct_actualites
    url_a: string ="http://localhost:8080/";
    actualite: string ='actualites';
    img: string ='images'
    affImg: string ='get/image/'; //suivi de l'id_img
    InfoImg: string ='get/image/info/'; //suivi de l'id_img
    upload: string ='addImage/'; //suivi de l'id_actu
    editImg: string ='updateImage/'; //suivi de l'id_img

    geturl_a(endpoint: string): string {
        return `${this.url_a}/${endpoint}`;
    }
}
