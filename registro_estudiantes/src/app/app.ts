import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioEstudianteComponent } from './formulario-estudiante/formulario-estudiante';
import { ListadoEstudiantesComponent } from './listado-estudiante/listado-estudiante';
import { Estudiante } from './estudiante.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormularioEstudianteComponent, ListadoEstudiantesComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {

  listaEstudiantes: Estudiante[] = [];
  estudianteEditando: Estudiante | null = null;

  onGuardarEstudiante(estudianteNuevo: Estudiante): void {
    const carneFinal = estudianteNuevo.carne || estudianteNuevo.numeroCarne || '';
    const estudianteConCarne: Estudiante = { ...estudianteNuevo, carne: carneFinal };

    const index = this.listaEstudiantes.findIndex(e => e.carne === estudianteConCarne.carne);

    if (index !== -1) {
      this.listaEstudiantes[index] = estudianteConCarne;
    } else {
      this.listaEstudiantes.push(estudianteConCarne);
    }

    // Actualizar referencia de la lista
    this.listaEstudiantes = [...this.listaEstudiantes];
    this.estudianteEditando = null;
  }

  onEditarEstudiante(estudiante: Estudiante): void {
    this.estudianteEditando = { ...estudiante };
  }

  onCancelarEdicion(): void {
    this.estudianteEditando = null;
  }

  onEliminarEstudiante(estudiante: Estudiante): void {
    this.listaEstudiantes = this.listaEstudiantes.filter(e => e.carne !== estudiante.carne);
  }
}