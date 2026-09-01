/**
 * Interfaz que representa un registro de estudiante en la aplicación.
 * Es utilizada tanto por el componente de formulario como por el
 * componente de listado (rol "Listado").
 */
export interface Estudiante {
  nombreCompleto: string;
  numeroCarne: string;
  correo: string;
  edad: number;
  carrera: string;
  jornada: string;
  /** Formato ISO 'yyyy-MM-dd', compatible con <input type="date"> */
  fechaNacimiento: string;
  /** Exactamente 8 dígitos numéricos */
  telefono: string;
  aceptaReglamento: boolean;
}

/** Catálogo fijo de carreras disponibles */
export const CARRERAS: string[] = [
  'Informática',
  'Administración',
  'Diseño',
  'Electrónica',
  'Contabilidad'
];

/** Catálogo fijo de jornadas disponibles */
export const JORNADAS: string[] = ['Matutina', 'Vespertina', 'Nocturna'];