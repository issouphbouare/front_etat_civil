import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hierachisations',
  templateUrl: './hierachisations.component.html',
  styleUrls: ['./hierachisations.component.css']
})
export class HierachisationsComponent {
  avancements: any[] = []; // Remplacer any[] par le type approprié
  keyword: string = '';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.search();
    
  }

  search() {
    this.http.get<any[]>(`http://localhost:8080/searchAvancement?keyword=${this.keyword}`).subscribe(
      (data :any) => {
        this.avancements = data.content;
      },
      (error) => {
        console.error('Une erreur est survenue:', error);
      }
    );
  }

}
