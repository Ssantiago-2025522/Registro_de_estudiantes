export interface Estudiante {
  carne: string; // <-- Asegúrate de que exista esta propiedad
  nombreCompleto: string;
  numeroCarne?: string;
  correo: string;
  edad: number;
  carrera: string;
  jornada: string;
  fechaNacimiento: string;
  telefono: string;
  aceptaReglamento?: boolean;
}