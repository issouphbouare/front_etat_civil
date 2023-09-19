import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RacineComponent } from './components/racine/racine.component';
import { HeaderComponent } from './components/header/header.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ActualitesComponent } from './components/actualite/actualites/actualites.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { AvancementsComponent } from './components/documents/avancement/avancements/avancements.component';
import { HierachisationsComponent } from './components/documents/Hierachisation/hierachisations/hierachisations.component';
import { FormationsComponent } from './components/documents/formation/formations/formations.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddActualiteComponent } from './components/actualite/add-actualite/add-actualite.component';
import { UpdateActualiteComponent } from './components/actualite/update-actualite/update-actualite.component';
import { AddAvancementComponent } from './components/documents/avancement/add-avancement/add-avancement.component';
import { DetailsActualiteComponent } from './components/actualite/details-actualite/details-actualite.component';
import { EditAvancementComponent } from './components/documents/avancement/edit-avancement/edit-avancement.component';
import { AddHierachisationComponent } from './components/documents/Hierachisation/add-hierachisation/add-hierachisation.component';
import { EditHierachisationComponent } from './components/documents/Hierachisation/edit-hierachisation/edit-hierachisation.component';
import { AddFormationComponent } from './components/documents/formation/add-formation/add-formation.component';
import { EditFormationComponent } from './components/documents/formation/edit-formation/edit-formation.component';
import { AutresComponent } from './components/documents/autre/autres/autres.component';
import { AddAutreComponent } from './components/documents/autre/add-autre/add-autre.component';
import { EditAutreComponent } from './components/documents/autre/edit-autre/edit-autre.component';
import { MilitantsComponent } from './components/militant/militants/militants.component';
import { AddMilitantComponent } from './components/militant/add-militant/add-militant.component';
import { LoginComponent } from './components/login/login.component';
import { IntegrationsComponent } from './components/documents/integration/integrations/integrations.component';
import { AddIntegrationComponent } from './components/documents/integration/add-integration/add-integration.component';
import { EditIntegrationComponent } from './components/documents/integration/edit-integration/edit-integration.component';
import { ProfilComponent } from './components/militant/profil/profil.component';
import { EditMilitantComponent } from './components/militant/edit-militant/edit-militant.component';
import { PasswordComponent } from './components/militant/password/password.component';
import { CoordinationsComponent } from './components/Admin/coordination/coordinations/coordinations.component';
import { AddCoordinationComponent } from './components/Admin/coordination/add-coordination/add-coordination.component';
import { EditCoordinationComponent } from './components/Admin/coordination/edit-coordination/edit-coordination.component';
import { DivisionsComponent } from './components/Admin/division/divisions/divisions.component';
import { AddDivisionComponent } from './components/Admin/division/add-division/add-division.component';
import { EditDivisionComponent } from './components/Admin/division/edit-division/edit-division.component';
import { UsersComponent } from './components/Admin/user/users/users.component';
import { EditUserComponent } from './components/Admin/user/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    RacineComponent,
    HeaderComponent,
    AccueilComponent,
    ActualitesComponent,
    AproposComponent,
    AvancementsComponent,
    HierachisationsComponent,
    FormationsComponent,
   FooterComponent,
    MenuComponent,
    AddActualiteComponent,
    UpdateActualiteComponent,
    AddAvancementComponent,
    DetailsActualiteComponent,
    EditAvancementComponent,
    AddHierachisationComponent,
    EditHierachisationComponent,
    AddFormationComponent,
    EditFormationComponent,
    AutresComponent,
    AddAutreComponent,
    EditAutreComponent,
    MilitantsComponent,
    AddMilitantComponent,
    LoginComponent,
    IntegrationsComponent,
    AddIntegrationComponent,
    EditIntegrationComponent,
    ProfilComponent,
    EditMilitantComponent,
    PasswordComponent,
    CoordinationsComponent,
    AddCoordinationComponent,
    EditCoordinationComponent,
    DivisionsComponent,
    AddDivisionComponent,
    EditDivisionComponent,
    UsersComponent,
    EditUserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
