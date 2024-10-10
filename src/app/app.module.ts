import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { WebcamModule } from 'ngx-webcam';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RacineComponent } from './components/racine/racine.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AddRegionComponent } from './components/collectivites/regions/add-region/add-region.component';
import { RegionsComponent } from './components/collectivites/regions/regions/regions.component';
import { EditRegionComponent } from './components/collectivites/regions/edit-region/edit-region.component';
import { AddCercleComponent } from './components/collectivites/cercles/add-cercle/add-cercle.component';
import { CerclesComponent } from './components/collectivites/cercles/cercles/cercles.component';
import { EditCercleComponent } from './components/collectivites/cercles/edit-cercle/edit-cercle.component';
import { AddCommuneComponent } from './components/collectivites/communes/add-commune/add-commune.component';
import { CommunesComponent } from './components/collectivites/communes/communes/communes.component';
import { EditCommuneComponent } from './components/collectivites/communes/edit-commune/edit-commune.component';
import { AddVqfComponent } from './components/collectivites/vqf/add-vqf/add-vqf.component';
import { VqfsComponent } from './components/collectivites/vqf/vqfs/vqfs.component';
import { EditVqfComponent } from './components/collectivites/vqf/edit-vqf/edit-vqf.component';
import { AddCitoyenComponent } from './components/citoyen/add-citoyen/add-citoyen.component';
import { CitoyensComponent } from './components/citoyen/citoyens/citoyens.component';
import { UsersComponent } from './components/admin/user/users/users.component';
import { AddUserComponent } from './components/admin/user/add-user/add-user.component';
import { LoginComponent } from './components/admin/user/login/login.component';
import { ProfessionsComponent } from './components/profession/professions/professions.component';
import { AddProfessionComponent } from './components/profession/add-profession/add-profession.component';
import { EditProfessionComponent } from './components/profession/edit-profession/edit-profession.component';
import { WebcamComponent } from './components/citoyen/webcam/webcam.component';
import { CitoyenComponent } from './components/citoyen/citoyen/citoyen.component';
import { EditWebcamComponent } from './components/citoyen/edit-webcam/edit-webcam.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditCitoyenComponent } from './components/citoyen/edit-citoyen/edit-citoyen.component';
import { EditUserComponent } from './components/admin/user/edit-user/edit-user.component';
import { PasswordComponent } from './components/admin/user/password/password.component';
import { ProfilComponent } from './components/admin/user/profil/profil.component';
import { PayesComponent } from './components/collectivites/payes/payes/payes.component';
import { AddPayeComponent } from './components/collectivites/payes/add-paye/add-paye.component';
import { EditPayeComponent } from './components/collectivites/payes/edit-paye/edit-paye.component';
import { VillesComponent } from './components/collectivites/ville/villes/villes.component';
import { AddVilleComponent } from './components/collectivites/ville/add-ville/add-ville.component';
import { EditVilleComponent } from './components/collectivites/ville/edit-ville/edit-ville.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { DocumentsComponent } from './components/document/documents/documents.component';
import { AddDocumentComponent } from './components/document/add-document/add-document.component';
import { CondamnationsComponent } from './components/condamnation/condamnations/condamnations.component';
import { AddCondamnationComponent } from './components/condamnation/add-condamnation/add-condamnation.component';
import { EditCondamnationComponent } from './components/condamnation/edit-condamnation/edit-condamnation.component';
import { LoaderComponent } from './components/loader/loader.component';
import { DeclarationDecesComponent } from './components/citoyen/declaration-deces/declaration-deces.component';

@NgModule({
  declarations: [
    AppComponent,
    RacineComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    AddRegionComponent,
    RegionsComponent,
    EditRegionComponent,
    AddCercleComponent,
    CerclesComponent,
    EditCercleComponent,
    AddCommuneComponent,
    CommunesComponent,
    EditCommuneComponent,
    AddVqfComponent,
    VqfsComponent,
    EditVqfComponent,
    AddCitoyenComponent,
    CitoyensComponent,
    UsersComponent,
    AddUserComponent,
    LoginComponent,
    ProfessionsComponent,
    AddProfessionComponent,
    EditProfessionComponent,
    WebcamComponent,
    CitoyenComponent,
    EditWebcamComponent,
    EditCitoyenComponent,
    EditUserComponent,
    PasswordComponent,
    ProfilComponent,
    PayesComponent,
    AddPayeComponent,
    EditPayeComponent,
    VillesComponent,
    AddVilleComponent,
    EditVilleComponent,
    DocumentsComponent,
    AddDocumentComponent,
    CondamnationsComponent,
    AddCondamnationComponent,
    EditCondamnationComponent,
    LoaderComponent,
    DeclarationDecesComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule.forRoot(),
    WebcamModule,
    ImageCropperModule
  
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
