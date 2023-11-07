import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioMaisRentavelComponent } from './usuario-mais-rentavel.component';

describe('UsuarioMaisRentavelComponent', () => {
  let component: UsuarioMaisRentavelComponent;
  let fixture: ComponentFixture<UsuarioMaisRentavelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioMaisRentavelComponent]
    });
    fixture = TestBed.createComponent(UsuarioMaisRentavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
