import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarQuadrasComponent } from './editar-quadras.component';

describe('EditarQuadrasComponent', () => {
  let component: EditarQuadrasComponent;
  let fixture: ComponentFixture<EditarQuadrasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarQuadrasComponent]
    });
    fixture = TestBed.createComponent(EditarQuadrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
