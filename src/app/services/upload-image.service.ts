import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  //private baseUrl="http://62.171.169.168:8080/Synefct_documents-0.0.1-SNAPSHOT"
  private baseUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) {}
   
  uploadTitre(file: File, id:any): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer your-access-token'
    });

    return this.http.post(this.baseUrl+"/addImageTitre/"+id, formData, { headers });
  }

  editTitre(file: File, id:any): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer your-access-token'
    });

    return this.http.put(this.baseUrl+"/updateImageTitre/"+id, formData, { headers });
  }

  editIm(file: File, id:any): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer your-access-token'
    });

    return this.http.put(this.baseUrl+"/updateImage/"+id, formData, { headers });
  }

  uploadIm(file: File, id:any): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer your-access-token'
    });

    return this.http.post(this.baseUrl+"/addImage/"+id, formData, { headers });
  }

  delete(url: string){
    return this.http.delete(url);
  }
}

