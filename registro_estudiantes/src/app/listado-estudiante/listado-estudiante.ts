import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Estudiante } from '../estudiante.model';

@Component({
  selector: 'app-listado-estudiantes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listado-estudiante.html',
  styleUrls: ['./listado-estudiante.scss']
})
export class ListadoEstudiantesComponent implements OnInit, OnChanges {

  @Input() estudiantes: Estudiante[] = [];
  @Output() editarEvent = new EventEmitter<Estudiante>();
  @Output() eliminarEvent = new EventEmitter<Estudiante>();

  estudiantesFiltrados: Estudiante[] = [];
  busqueda: string = '';
  estudianteEditando: Estudiante | null = null;

  carreras: string[] = ['Informática', 'Electrónica', 'Mecánica', 'Electricidad'];
  jornadas: string[] = ['Matutina', 'Vespertina'];

  get totalEstudiantes(): number {
    return this.estudiantes.length;
  }

  ngOnInit(): void {
    this.actualizarLista();
  }

  //  DETECTA LOS CAMBIOS DEL @INPUT Y ACTUALIZA LA TABLA
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['estudiantes']) {
      this.actualizarLista();
    }
  }

  actualizarLista(): void {
    const texto = this.busqueda.toLowerCase().trim();
    
    if (!texto) {
      this.estudiantesFiltrados = [...this.estudiantes];
      return;
    }

    this.estudiantesFiltrados = this.estudiantes.filter(e =>
      (e.nombreCompleto && e.nombreCompleto.toLowerCase().includes(texto)) ||
      (e.carne && e.carne.toLowerCase().includes(texto)) ||
      (e.numeroCarne && e.numeroCarne.toLowerCase().includes(texto))
    );
  }

  limpiarBusqueda(): void {
    this.busqueda = '';
    this.actualizarLista();
  }

  editarEstudiante(estudiante: Estudiante): void {
    this.estudianteEditando = estudiante;
    this.editarEvent.emit(estudiante);
  }

  cancelarEdicion(): void {
    this.estudianteEditando = null;
  }

  eliminarEstudiante(estudiante: Estudiante): void {
    this.eliminarEvent.emit(estudiante);
  }
}