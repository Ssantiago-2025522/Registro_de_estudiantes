import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Estudiante {
  nombreCompleto: string;
  carne: string;
  correo: string;
  edad: number;
  carrera: string;
  jornada: string;
  fechaNacimiento: string;
  telefono: string;
  aceptarReglamento: boolean;
}

@Component({
  selector: 'app-listado-estudiantes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listado-estudiantes.html',
  styleUrls: ['./listado-estudiantes.scss']
})
export class ListadoEstudiantesComponent {

  estudiantes: Estudiante[] = [];

  estudiantesFiltrados: Estudiante[] = [];

  busqueda: string = '';

  estudianteEditando: Estudiante | null = null;

  carreras: string[] = [
    'Informática',
    'Administración',
    'Diseño',
    'Electrónica',
    'Contabilidad'
  ];

  jornadas: string[] = [
    'Matutina',
    'Vespertina',
    'Nocturna'
  ];

  constructor() {
    this.actualizarLista();
  }

  actualizarLista(): void {
    const texto = this.busqueda.toLowerCase().trim();

    if (!texto) {
      this.estudiantesFiltrados = [...this.estudiantes];
      return;
    }

    this.estudiantesFiltrados = this.estudiantes.filter(estudiante =>
      estudiante.nombreCompleto.toLowerCase().includes(texto) ||
      estudiante.carne.toLowerCase().includes(texto)
    );
  }


  agregarEstudiante(estudiante: Estudiante): boolean {


    const carneExiste = this.estudiantes.some(
      e => e.carne.toLowerCase() === estudiante.carne.toLowerCase()
    );

    if (carneExiste) {
      alert('Ya existe un estudiante con ese número de carné.');
      return false;
    }

    this.estudiantes.push(estudiante);

    this.actualizarLista();

    return true;
  }


  editarEstudiante(estudiante: Estudiante): void {

    this.estudianteEditando = {
      ...estudiante
    };

  
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  actualizarEstudiante(estudianteActualizado: Estudiante): boolean {

    if (!this.estudianteEditando) {
      return false;
    }

    const carneExiste = this.estudiantes.some(
      estudiante =>
        estudiante.carne.toLowerCase() === estudianteActualizado.carne.toLowerCase() &&
        estudiante !== this.estudianteEditando
    );

    if (carneExiste) {
      alert('No se puede utilizar ese carné porque ya pertenece a otro estudiante.');
      return false;
    }

    const indice = this.estudiantes.findIndex(
      estudiante => estudiante === this.estudianteEditando
    );

    if (indice === -1) {
      return false;
    }

    this.estudiantes[indice] = {
      ...estudianteActualizado
    };

    this.estudianteEditando = null;

    this.actualizarLista();

    return true;
  }

  eliminarEstudiante(estudiante: Estudiante): void {

    const confirmar = confirm(
      `¿Está seguro/a de que desea eliminar al estudiante "${estudiante.nombreCompleto}"?`
    );

    if (!confirmar) {
      return;
    }

    this.estudiantes = this.estudiantes.filter(
      e => e !== estudiante
    );

    if (this.estudianteEditando === estudiante) {
      this.estudianteEditando = null;
    }

    this.actualizarLista();
  }

  cancelarEdicion(): void {
    this.estudianteEditando = null;
  }

  limpiarBusqueda(): void {
    this.busqueda = '';
    this.actualizarLista();
  }

  get totalEstudiantes(): number {
    return this.estudiantes.length;
  }
}