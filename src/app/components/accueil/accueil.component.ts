import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  contentVisible = false;

  toggleContent() {
    this.contentVisible = !this.contentVisible;
  }

}
