import { Injectable } from '@angular/core';
import { MilitantService } from './militant.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  totalMilitant: number=12;

  constructor(private miltantService: MilitantService) { }

  MilitantActif(){
    this.miltantService.getMilitantActif().
    subscribe( (data:any) => { 
      return data;
      console.log(this.totalMilitant);
    },err=>{
      
    });}
}
