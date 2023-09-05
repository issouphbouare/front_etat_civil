import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { ActualitesComponent } from './components/actualite/actualites/actualites.component';
import { AvancementsComponent } from './components/documents/avancement/avancements/avancements.component';
import { FormationsComponent } from './components/documents/formation/formations/formations.component';
import { HierachisationsComponent } from './components/documents/Hierachisation/hierachisations/hierachisations.component';
import { GestionMilitantComponent } from './components/coordinations/gestion-militant/gestion-militant.component';
import { GestionFinanceComponent } from './components/coordinations/gestion-finance/gestion-finance.component';
import { FileDBComponent } from './components/documents/avancement/file-db/file-db.component';
import { AddActualiteComponent } from './components/actualite/add-actualite/add-actualite.component';
import { AddAvancementComponent } from './components/documents/avancement/add-avancement/add-avancement.component';
import { DetailsActualiteComponent } from './components/actualite/details-actualite/details-actualite.component';
import { EditAvancementComponent } from './components/documents/avancement/edit-avancement/edit-avancement.component';
import { AddFormationComponent } from './components/documents/formation/add-formation/add-formation.component';
import { EditHierachisationComponent } from './components/documents/Hierachisation/edit-hierachisation/edit-hierachisation.component';
import { AddHierachisationComponent } from './components/documents/Hierachisation/add-hierachisation/add-hierachisation.component';
import { EditAutreComponent } from './components/documents/autre/edit-autre/edit-autre.component';
import { AddAutreComponent } from './components/documents/autre/add-autre/add-autre.component';
import { AutresComponent } from './components/documents/autre/autres/autres.component';
import { EditFormationComponent } from './components/documents/formation/edit-formation/edit-formation.component';

const routes: Routes = [
  {path : "" , component : AccueilComponent },
 {path : "apropos" , component : AproposComponent },
 {path : "actualites" , component : ActualitesComponent },
 {path : "detailsActualite/:id" , component : DetailsActualiteComponent },
 {path : "addActualite" , component : AddActualiteComponent},
 {path : "avancements" , component : AvancementsComponent },
 {path : "addAvancement" , component : AddAvancementComponent},
 {path : "editAvancement/:id" , component : EditAvancementComponent },
 {path : "formations" , component : FormationsComponent },
 {path : "addFormation" , component : AddFormationComponent},
 {path : "editFormation/:id" , component : EditFormationComponent },
 {path : "hierachisations" , component : HierachisationsComponent },
 {path : "addHierachisation" , component : AddHierachisationComponent},
 {path : "editHierachisation/:id" , component : EditHierachisationComponent },
 {path : "autres" , component : AutresComponent },
 {path : "addAutre" , component : AddAutreComponent},
 {path : "editAutre/:id" , component : EditAutreComponent },
 {path : "gestionMilitants" , component : GestionMilitantComponent },
 {path : "gestionFinances" , component : GestionFinanceComponent },
 {path : "fileByAv/:id" , component : FileDBComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
