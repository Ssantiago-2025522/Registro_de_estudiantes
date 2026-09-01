import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { FormularioEstudianteComponent } from './formulario-estudiante/formulario-estudiante';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registro', component: FormularioEstudianteComponent },
  { path: '**', redirectTo: '' } // Redirección por defecto si la ruta no existe
];