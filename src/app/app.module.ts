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
import { HierachisationsComponent } from './components/documents/hierachisations/hierachisations.component';
import { FormationsComponent } from './components/documents/formations/formations.component';
import { GestionMilitantComponent } from './components/coordinations/gestion-militant/gestion-militant.component';
import { GestionFinanceComponent } from './components/coordinations/gestion-finance/gestion-finance.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddActualiteComponent } from './components/actualite/add-actualite/add-actualite.component';
import { UpdateActualiteComponent } from './components/actualite/update-actualite/update-actualite.component';
import { AddAvancementComponent } from './components/documents/avancement/add-avancement/add-avancement.component';
import { DetailsActualiteComponent } from './components/actualite/details-actualite/details-actualite.component';

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
    GestionMilitantComponent,
    GestionFinanceComponent,
    FooterComponent,
    MenuComponent,
    AddActualiteComponent,
    UpdateActualiteComponent,
    AddAvancementComponent,
    DetailsActualiteComponent,
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
