import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroQuadrasComponent } from './cadastro-quadras.component';

describe('CadastroQuadrasComponent', () => {
  let component: CadastroQuadrasComponent;
  let fixture: ComponentFixture<CadastroQuadrasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroQuadrasComponent]
    });
    fixture = TestBed.createComponent(CadastroQuadrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
