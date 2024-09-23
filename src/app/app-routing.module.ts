import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatieresComponent } from './matieres/matieres.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import {NewMatiereComponent} from "./new-matiere/new-matiere.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthenticationService} from "./services/authentication.service";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {ProfileComponent} from "./profile/profile.component";
import {NewEtudiantComponent} from "./new-etudiant/new-etudiant.component";
import {EditEtudiantComponent} from "./edit-etudiant/edit-etudiant.component";
import {NotesMatieresEtudComponent} from "./notes-matieres-etud/notes-matieres-etud.component";
import {EditMatiereComponent} from "./edit-matiere/edit-matiere.component";
import {HomeComponent} from "./home/home.component";
import {OrientationComponent} from "./orientation/orientation.component";
import {OrientationGeneraleComponent} from "./orientation-generale/orientation-generale.component";


const routes: Routes = [
  { path:"", component: LoginComponent

  },

  { path:"admin", component: AdminComponent, canActivate:[AuthenticationGuard], children:[
      { path:"etudiants", component: EtudiantsComponent

      },
      { path:"home", component: HomeComponent

  },
      {
        path:"matieres",component: MatieresComponent
      },
      {
        path:"new-matiere",component:NewMatiereComponent
      },
      {
        path:"new-etudiant",component:NewEtudiantComponent
      },
      {
        path:"profile",component:ProfileComponent
      },
      {
        path:"orientation",component:OrientationComponent
      },
      {
        path:"orientation-generale",component:OrientationGeneraleComponent
      },


      {
        path:"",redirectTo:"/etudiants",pathMatch:'full'
      },
      {
        path:"edit-etudiant/:id",component:EditEtudiantComponent
      },
      {
        path:"edit-matiere/:id",component:EditMatiereComponent
      },
      {
        path:"notes-matieres-etud",component:NotesMatieresEtudComponent
      },

    ]

  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
