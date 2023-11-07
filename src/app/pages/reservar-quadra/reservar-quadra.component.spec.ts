import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarQuadraComponent } from './reservar-quadra.component';

describe('ReservarQuadraComponent', () => {
  let component: ReservarQuadraComponent;
  let fixture: ComponentFixture<ReservarQuadraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservarQuadraComponent]
    });
    fixture = TestBed.createComponent(ReservarQuadraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
