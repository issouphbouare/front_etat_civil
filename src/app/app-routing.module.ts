import { Component, NgModule } from '@angular/core';
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

const routes: Routes = [
  {path : "" , component : LoginComponent },
 {path : "login" , component : LoginComponent },
 {path :"addUser" , component : AddUserComponent},
 {path :"users" , component : UsersComponent},

 {path : "regions" , component : RegionsComponent },
 {path :"addRegion" , component : AddRegionComponent},
 {path : "editRegion/:id" , component : EditRegionComponent },
 {path : "cercles/:id" , component : CerclesComponent },

 {path :"addCercle/:id" , component : AddCercleComponent},
 {path : "editCercle/:id" , component : EditCercleComponent },
 {path : "cercles/:id" , component : CerclesComponent },

 {path :"addCommune/:id" , component : AddCommuneComponent},
 {path : "editCommune/:id" , component : EditCommuneComponent },
 {path : "communes/:id" , component : CommunesComponent },

 {path : "vqfs/:id" , component : VqfsComponent },
 {path :"addVqf/:id" , component : AddVqfComponent},
 {path : "editVqf/:id" , component : EditVqfComponent },

 {path :"addCitoyen" , component : AddCitoyenComponent},
 {path :"citoyens" , component : CitoyensComponent},

 {path : "professions" , component : ProfessionsComponent },
 {path :"addProfession" , component : AddProfessionComponent},
 {path : "editProfession/:id" , component : EditProfessionComponent },
 
 // Ajoutez vos autres routes ici
 { path: '', redirectTo: '/citoyens', pathMatch: 'full' }, // Redirection par défaut
 { path: '**', redirectTo: '/citoyens' }, // Redirection pour les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
