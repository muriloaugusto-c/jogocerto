import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarInventarioComponent } from './consultar-inventario.component';

describe('ConsultarInventarioComponent', () => {
  let component: ConsultarInventarioComponent;
  let fixture: ComponentFixture<ConsultarInventarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarInventarioComponent]
    });
    fixture = TestBed.createComponent(ConsultarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
