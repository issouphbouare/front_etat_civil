import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { ActualitesComponent } from './components/actualites/actualites.component';
import { AvancementsComponent } from './components/documents/avancements/avancements.component';
import { FormationsComponent } from './components/documents/formations/formations.component';
import { HierachisationsComponent } from './components/documents/hierachisations/hierachisations.component';
import { GestionMilitantComponent } from './components/coordinations/gestion-militant/gestion-militant.component';
import { GestionFinanceComponent } from './components/coordinations/gestion-finance/gestion-finance.component';

const routes: Routes = [
  {path : "" , component : AccueilComponent },
 {path : "apropos" , component : AproposComponent },
 {path : "actualites" , component : ActualitesComponent },
 {path : "avancements" , component : AvancementsComponent },
 {path : "formations" , component : FormationsComponent },
 {path : "hierachisations" , component : HierachisationsComponent },
 {path : "gestionMilitants" , component : GestionMilitantComponent },
 {path : "gestionFinances" , component : GestionFinanceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
