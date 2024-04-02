import { ResourceLoader } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  //public i:number=6;
  public total:number=0;
  public username:any;

  //public cu: number;
  constructor (private router : Router){}
     
  ngOnInit(): void{

  }
  onDeconnecter(){

  }

}
