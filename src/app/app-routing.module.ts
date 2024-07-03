import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionsComponent } from './components/collectivites/regions/regions/regions.component';
import { AddRegionComponent } from './components/collectivites/regions/add-region/add-region.component';
import { EditRegionComponent } from './components/collectivites/regions/edit-region/edit-region.component';
import { CerclesComponent } from './components/collectivites/cercles/cercles/cercles.component';
import { AddCercleComponent } from './components/collectivites/cercles/add-cercle/add-cercle.component';
import { EditCercleComponent } from './components/collectivites/cercles/edit-cercle/edit-cercle.component';
import { EditVqfComponent } from './components/collectivites/vqf/edit-vqf/edit-vqf.component';
import { AddVqfComponent } from './components/collectivites/vqf/add-vqf/add-vqf.component';
import { VqfsComponent } from './components/collectivites/vqf/vqfs/vqfs.component';
import { EditCommuneComponent } from './components/collectivites/communes/edit-commune/edit-commune.component';
import { AddCommuneComponent } from './components/collectivites/communes/add-commune/add-commune.component';
import { CommunesComponent } from './components/collectivites/communes/communes/communes.component';
import { AddCitoyenComponent } from './components/citoyen/add-citoyen/add-citoyen.component';
import { CitoyensComponent } from './components/citoyen/citoyens/citoyens.component';
import { LoginComponent } from './components/admin/user/login/login.component';
import { AddUserComponent } from './components/admin/user/add-user/add-user.component';
import { UsersComponent } from './components/admin/user/users/users.component';
import { ProfessionsComponent } from './components/profession/professions/professions.component';
import { AddProfessionComponent } from './components/profession/add-profession/add-profession.component';
import { EditProfessionComponent } from './components/profession/edit-profession/edit-profession.component';
import { CitoyenComponent } from './components/citoyen/citoyen/citoyen.component';
import { EditWebcamComponent } from './components/citoyen/edit-webcam/edit-webcam.component';
import { EditCitoyenComponent } from './components/citoyen/edit-citoyen/edit-citoyen.component';
import { EditUserComponent } from './components/admin/user/edit-user/edit-user.component';
import { PasswordComponent } from './components/admin/user/password/password.component';
import { ProfilComponent } from './components/admin/user/profil/profil.component';
import { EditPayeComponent } from './components/collectivites/payes/edit-paye/edit-paye.component';
import { AddPayeComponent } from './components/collectivites/payes/add-paye/add-paye.component';
import { PayesComponent } from './components/collectivites/payes/payes/payes.component';
import { EditVilleComponent } from './components/collectivites/ville/edit-ville/edit-ville.component';
import { AddVilleComponent } from './components/collectivites/ville/add-ville/add-ville.component';
import { VillesComponent } from './components/collectivites/ville/villes/villes.component';
import { DocumentsComponent } from './components/document/documents/documents.component';
import { AddDocumentComponent } from './components/document/add-document/add-document.component';

const routes: Routes = [
  {path : "" , component : LoginComponent },
 {path : "login" , component : LoginComponent },
 {path :"addUser" , component : AddUserComponent},
 {path :"editUser/:id" , component : EditUserComponent},
 {path :"profil/:id" , component : ProfilComponent},
 {path :"password/:id" , component : PasswordComponent},
 {path :"users" , component : UsersComponent},

 {path : "regions" , component : RegionsComponent },
 {path :"addRegion" , component : AddRegionComponent},
 {path : "editRegion/:id" , component : EditRegionComponent },
 {path : "cercles" , component : CerclesComponent },

 {path :"addCercle" , component : AddCercleComponent},
 {path : "editCercle/:id" , component : EditCercleComponent },
 {path : "cercles" , component : CerclesComponent },

 {path :"addCommune" , component : AddCommuneComponent},
 {path : "editCommune/:id" , component : EditCommuneComponent },
 {path : "communes" , component : CommunesComponent },

 {path : "vqfs" , component : VqfsComponent },
 {path :"addVqf" , component : AddVqfComponent},
 {path : "editVqf/:id" , component : EditVqfComponent },

 {path : "payes" , component : PayesComponent },
 {path :"addPayes" , component : AddPayeComponent},
 {path : "editPayes/:id" , component : EditPayeComponent },

 {path : "villes" , component : VillesComponent },
 {path :"addVille" , component : AddVilleComponent},
 {path : "editVille/:id" , component : EditVilleComponent },

 {path :"addCitoyen" , component : AddCitoyenComponent},
 {path :"citoyens" , component : CitoyensComponent},
 {path : "citoyen/:id" , component : CitoyenComponent },
 {path : "editCitoyen/:id" , component : EditCitoyenComponent },
 {path : "editWebcam/:id" , component : EditWebcamComponent },


 {path : "professions" , component : ProfessionsComponent },
 {path :"addProfession" , component : AddProfessionComponent},
 {path : "editProfession/:id" , component : EditProfessionComponent },

 {path : "documents" , component : DocumentsComponent },
 {path :"addDocument" , component : AddDocumentComponent},
 
 // Ajoutez vos autres routes ici
 { path: '', redirectTo: '/citoyens', pathMatch: 'full' }, // Redirection par défaut
 { path: '**', redirectTo: '/citoyens' }, // Redirection pour les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
