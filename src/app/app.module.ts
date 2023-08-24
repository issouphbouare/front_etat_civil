import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RacineComponent } from './components/racine/racine.component';
import { HeaderComponent } from './components/header/header.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ActualitesComponent } from './components/actualites/actualites.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { AvancementsComponent } from './components/documents/avancements/avancements.component';
import { HierachisationsComponent } from './components/documents/hierachisations/hierachisations.component';
import { FormationsComponent } from './components/documents/formations/formations.component';
import { GestionMilitantComponent } from './components/coordinations/gestion-militant/gestion-militant.component';
import { GestionFinanceComponent } from './components/coordinations/gestion-finance/gestion-finance.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';

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
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
