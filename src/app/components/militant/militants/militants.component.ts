import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MilitantService } from 'src/app/services/militant.service';
import { AuthService } from 'src/app/services/auth.service';
import { CellConfig, jsPDF } from 'jspdf';

@Component({
  selector: 'app-militants',
  templateUrl: './militants.component.html',
  styleUrls: ['./militants.component.css']
})
export class MilitantsComponent {
  public user:any;
  public militants: any;
  public files : any;
  public av=1;
  keyword: string = '';
  urlDownload: string='';
  idAv: number =0;
  totalSearch:number=0;

  constructor(private http: HttpClient,private authService: AuthService,
    private apiService: MilitantService,
    private router : Router) { }


  ngOnInit(): void {
    this.av=1;
    this.search();
    this.getTotalSearch();
    this.getMaxId();

    this.authService.getCon(this.authService.loggedMilitant.toString()).
    subscribe( data => {
      this.user=data; 
    },err=>{console.log(err);});
    
  }

  search() {
    this.apiService.search(this.keyword).subscribe(
      (data :any) => {
        this.militants = data.content;
        this.getTotalSearch();
      },
      (error) => {
        console.error('Une erreur est survenue:', error);
      }
    );
  }
  getMaxId(){
    this.apiService.getMaxId().
    subscribe( (data:any) => { 
      this.idAv=data;
      console.log(data)
    },err=>{
      
    });
  }

  getTotalSearch(){
    this.apiService.getTotalSearch(this.keyword).subscribe(
      (data :any) => {
        this.totalSearch = data;
      },
      (error) => {
        console.error('Une erreur est survenue:', error);
      }
    );

  }
  

  onDelete(a: any){
    if(confirm("Voulez-vous vraiment supprimer ce compte ?")){
      console.log();
      this.apiService.delete(a)
      .subscribe( data=>{
        this.search();
        window.location.reload();
    
        }, err=>{
          console.log(err);
        }
      );

    //alert("Militant  supprimé avec succes");
  }
    
  }
  onRetour(){
    this.av=1;
  }

  title = 'Liste des Militants ';


  exportDataToPDF() {
    // Creating a unique file name for my PDF
    const fileName = this.title.replace(' ', '_') + '_' + Math.floor((Math.random() * 1000000) + 1) + '.pdf';
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF('landscape');
    doc.setFontSize(18);
    
    doc.setFont('helvetica', 'bold');
    const titleXPos = (doc.internal.pageSize.getWidth() / 2) - (doc.getTextWidth(this.title) / 2);
    doc.text(this.title, titleXPos, 16 );
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.table(10, 35, this._getDataForPdfTable(), this._createHeadersForPdfTable([
      'telephone', 'prenom', 'nom', 'comite' , 'division', 'coordination'
    ]), { autoSize: false });
    doc.save(fileName);
  }

  private _createHeadersForPdfTable(keys: string[]) {
    const result: CellConfig[] = [];
    for (let i = 0; i < keys.length; i += 1) {
      result.push({
        name: keys[i],
        prompt: keys[i],
        width: 60,
        align: 'left',
        padding: 2, 
      });
    }
    return result;
  }

  private _getDataForPdfTable() {
    const data = [];
    for (let m of this.militants) {
      data.push({
        telephone: m.telephone.toString(),
        prenom: m.prenom,
        nom: m.nom,
        comite: m.comite,
        division: m.division.nom,
        coordination: m.division.coordination.nom,
      });
    }
    return data;
  }

}






