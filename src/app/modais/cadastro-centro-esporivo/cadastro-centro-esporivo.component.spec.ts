import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCentroEsporivoComponent } from './cadastro-centro-esporivo.component';

describe('CadastroCentroEsporivoComponent', () => {
  let component: CadastroCentroEsporivoComponent;
  let fixture: ComponentFixture<CadastroCentroEsporivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroCentroEsporivoComponent]
    });
    fixture = TestBed.createComponent(CadastroCentroEsporivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
