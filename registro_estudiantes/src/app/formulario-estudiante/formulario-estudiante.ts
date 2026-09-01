import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../estudiante.model';

@Component({
  selector: 'app-formulario-estudiante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-estudiante.html',
  styleUrls: ['./formulario-estudiante.scss']
})
export class FormularioEstudianteComponent implements OnInit, OnChanges {

  @Input() estudianteParaEditar: Estudiante | null = null;
  @Output() guardarEstudiante = new EventEmitter<Estudiante>();
  @Output() cancelarEdicionEvent = new EventEmitter<void>();

  form!: FormGroup;
  modoEdicion: boolean = false;

  carreras: string[] = ['Informática', 'Electrónica', 'Mecánica', 'Electricidad'];
  jornadas: string[] = ['Matutina', 'Vespertina'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['estudianteParaEditar'] && this.form) {
      if (this.estudianteParaEditar) {
        this.modoEdicion = true;
        this.form.patchValue({
          ...this.estudianteParaEditar,
          numeroCarne: this.estudianteParaEditar.carne || this.estudianteParaEditar.numeroCarne
        });
      } else {
        this.limpiarFormulario();
      }
    }
  }

  inicializarFormulario(): void {
    this.form = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(5)]],
      numeroCarne: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(14), Validators.max(25)]],
      carrera: ['', Validators.required],
      jornada: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      aceptaReglamento: [false, Validators.requiredTrue]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const estudianteData: Estudiante = {
        ...this.form.value,
        carne: this.form.value.numeroCarne
      };

      this.guardarEstudiante.emit(estudianteData);
      this.limpiarFormulario();
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancelar(): void {
    this.limpiarFormulario();
    this.cancelarEdicionEvent.emit();
  }

  limpiarFormulario(): void {
    this.modoEdicion = false;
    if (this.form) {
      this.form.reset({
        carrera: '',
        aceptaReglamento: false
      });
    }
  }
}