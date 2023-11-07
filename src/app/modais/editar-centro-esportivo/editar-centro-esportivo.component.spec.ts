import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCentroEsportivoComponent } from './editar-centro-esportivo.component';

describe('EditarCentroEsportivoComponent', () => {
  let component: EditarCentroEsportivoComponent;
  let fixture: ComponentFixture<EditarCentroEsportivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCentroEsportivoComponent]
    });
    fixture = TestBed.createComponent(EditarCentroEsportivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
