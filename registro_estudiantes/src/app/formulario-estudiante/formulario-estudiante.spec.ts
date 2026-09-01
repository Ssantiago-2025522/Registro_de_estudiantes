import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioEstudiante } from './formulario-estudiante';

describe('FormularioEstudiante', () => {
  let component: FormularioEstudiante;
  let fixture: ComponentFixture<FormularioEstudiante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEstudiante],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioEstudiante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
