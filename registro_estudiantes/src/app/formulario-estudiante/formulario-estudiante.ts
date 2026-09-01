import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Estudiante, CARRERAS, JORNADAS } from '../estudiante.model';

/**
 * Componente responsable ÚNICAMENTE de la captura, validación y edición
 * de los datos de un estudiante. No conoce ni maneja el listado completo:
 * se limita a emitir eventos que el componente "Listado" (u otro servicio
 * compartido) debe escuchar.
 */
@Component({
  selector: 'app-formulario-estudiante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-estudiante.html',
  styleUrls: ['./formulario-estudiante.scss']
})
export class FormularioEstudianteComponent implements OnChanges {

  /** Estudiante recibido para edición. null/undefined => modo creación */
  @Input() estudianteEditar: Estudiante | null = null;

  /** Carnés ya registrados en el listado, usados para validar duplicados */
  @Input() carnesExistentes: string[] = [];

  /** Emite el estudiante ya validado, listo para crear o actualizar */
  @Output() guardarEstudiante = new EventEmitter<Estudiante>();

  /** Emite cuando el usuario cancela una edición en curso */
  @Output() cancelarEdicion = new EventEmitter<void>();

  carreras = CARRERAS;
  jornadas = JORNADAS;

  /** Guarda el carné original mientras se edita, para excluirlo de la validación de duplicados */
  private carneOriginal: string | null = null;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(5)]],
      numeroCarne: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
      edad: [null, [Validators.required, Validators.min(14), Validators.max(25)]],
      carrera: ['', Validators.required],
      jornada: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      aceptaReglamento: [false, Validators.requiredTrue]
    });
  }

  /** Reacciona cuando el padre envía (o quita) un estudiante para editar */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['estudianteEditar']) {
      if (this.estudianteEditar) {
        this.cargarParaEdicion(this.estudianteEditar);
      } else {
        this.carneOriginal = null;
      }
    }
  }

  /** true cuando el formulario está mostrando datos de un estudiante existente */
  get modoEdicion(): boolean {
    return this.estudianteEditar !== null;
  }

  /** Acceso rápido a los controles desde la plantilla HTML */
  get f() {
    return this.form.controls;
  }

  /** Carga los datos del estudiante recibido dentro del formulario */
  private cargarParaEdicion(estudiante: Estudiante): void {
    this.carneOriginal = estudiante.numeroCarne;
    this.form.patchValue({ ...estudiante });
  }

  /** Verifica si el carné ingresado ya existe (excluyendo el propio, en modo edición) */
  private carneRepetido(carne: string): boolean {
    const normalizado = carne.trim().toLowerCase();
    const original = (this.carneOriginal ?? '').trim().toLowerCase();

    return this.carnesExistentes
      .filter(c => c.trim().toLowerCase() !== original)
      .some(c => c.trim().toLowerCase() === normalizado);
  }

  /** Maneja el envío del formulario: bloquea datos inválidos o carnés repetidos */
  onSubmit(): void {
    // Marca todos los campos como tocados para revelar los errores pendientes
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const numeroCarne = this.form.value.numeroCarne as string;

    if (this.carneRepetido(numeroCarne)) {
      this.form.get('numeroCarne')?.setErrors({ carneDuplicado: true });
      return;
    }

    const estudiante: Estudiante = { ...this.form.value };
    this.guardarEstudiante.emit(estudiante);
    this.resetFormulario();
  }

  /** Limpia el formulario y, si aplica, cancela la edición en curso */
  onCancelar(): void {
    this.resetFormulario();
    this.cancelarEdicion.emit();
  }

  /** Devuelve el formulario a su estado inicial vacío */
  private resetFormulario(): void {
    this.form.reset({
      nombreCompleto: '',
      numeroCarne: '',
      correo: '',
      edad: null,
      carrera: '',
      jornada: '',
      fechaNacimiento: '',
      telefono: '',
      aceptaReglamento: false
    });
    this.carneOriginal = null;
  }

    modoOscuro: boolean = false;
    
    toggleModoOscuro() {
      this.modoOscuro = !this.modoOscuro;
    }
}