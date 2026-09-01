import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioEstudianteComponent } from './formulario-estudiante/formulario-estudiante';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormularioEstudianteComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('registro_estudiantes');
}