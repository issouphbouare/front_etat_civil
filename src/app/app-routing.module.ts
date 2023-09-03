import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { ActualitesComponent } from './components/actualite/actualites/actualites.component';
import { AvancementsComponent } from './components/documents/avancement/avancements/avancements.component';
import { FormationsComponent } from './components/documents/formations/formations.component';
import { HierachisationsComponent } from './components/documents/hierachisations/hierachisations.component';
import { GestionMilitantComponent } from './components/coordinations/gestion-militant/gestion-militant.component';
import { GestionFinanceComponent } from './components/coordinations/gestion-finance/gestion-finance.component';
import { FileDBComponent } from './components/documents/avancement/file-db/file-db.component';
import { AddActualiteComponent } from './components/actualite/add-actualite/add-actualite.component';
import { AddAvancementComponent } from './components/documents/avancement/add-avancement/add-avancement.component';
import { DetailsActualiteComponent } from './components/actualite/details-actualite/details-actualite.component';

const routes: Routes = [
  {path : "" , component : AccueilComponent },
 {path : "apropos" , component : AproposComponent },
 {path : "actualites" , component : ActualitesComponent },
 {path : "detailsActualite/:id" , component : DetailsActualiteComponent },
 {path : "addActualite" , component : AddActualiteComponent},
 {path : "avancements" , component : AvancementsComponent },
 {path : "addAvancement" , component : AddAvancementComponent},
 {path : "formations" , component : FormationsComponent },
 {path : "hierachisations" , component : HierachisationsComponent },
 {path : "gestionMilitants" , component : GestionMilitantComponent },
 {path : "gestionFinances" , component : GestionFinanceComponent },
 {path : "fileByAv/:id" , component : FileDBComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
