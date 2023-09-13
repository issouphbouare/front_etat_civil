import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { ActualitesComponent } from './components/actualite/actualites/actualites.component';
import { AvancementsComponent } from './components/documents/avancement/avancements/avancements.component';
import { FormationsComponent } from './components/documents/formation/formations/formations.component';
import { HierachisationsComponent } from './components/documents/Hierachisation/hierachisations/hierachisations.component';
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
import { MilitantsComponent } from './components/militant/militants/militants.component';
import { AddMilitantComponent } from './components/militant/add-militant/add-militant.component';
import { LoginComponent } from './components/login/login.component';
import { IntegrationsComponent } from './components/documents/integration/integrations/integrations.component';
import { AddIntegrationComponent } from './components/documents/integration/add-integration/add-integration.component';
import { EditIntegrationComponent } from './components/documents/integration/edit-integration/edit-integration.component';
import { EditMilitantComponent } from './components/militant/edit-militant/edit-militant.component';
import { ProfilComponent } from './components/militant/profil/profil.component';
import { PasswordComponent } from './components/militant/password/password.component';

const routes: Routes = [
  {path : "" , component : AccueilComponent },
 {path : "apropos" , component : AproposComponent },
 {path : "actualites" , component : ActualitesComponent },
 {path : "militants" , component : MilitantsComponent },
 {path :"addMilitant" , component : AddMilitantComponent},
 {path : "editMilitant/:id" , component : EditMilitantComponent },
 {path : "detailsActualite/:id" , component : DetailsActualiteComponent },
 {path : "addActualite" , component : AddActualiteComponent},
 {path : "avancements" , component : AvancementsComponent },
 {path : "addAvancement" , component : AddAvancementComponent},
 {path : "editAvancement/:id" , component : EditAvancementComponent },
 {path : "integrations" , component : IntegrationsComponent },
 {path : "addIntegration" , component : AddIntegrationComponent},
 {path : "editIntegration/:id" , component : EditIntegrationComponent },
 {path : "formations" , component : FormationsComponent },
 {path : "addFormation" , component : AddFormationComponent},
 {path : "editFormation/:id" , component : EditFormationComponent },
 {path : "hierachisations" , component : HierachisationsComponent },
 {path : "addHierachisation" , component : AddHierachisationComponent},
 {path : "editHierachisation/:id" , component : EditHierachisationComponent },
 {path : "autres" , component : AutresComponent },
 {path : "addAutre" , component : AddAutreComponent},
 {path : "editAutre/:id" , component : EditAutreComponent },
 {path : "fileByAv/:id" , component : FileDBComponent },
 {path : "login" , component : LoginComponent },
 {path : "profil" , component : ProfilComponent },
 {path : "password" , component : PasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
