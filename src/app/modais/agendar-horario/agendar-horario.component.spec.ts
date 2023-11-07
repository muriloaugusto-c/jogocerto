import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarHorarioComponent } from './agendar-horario.component';

describe('AgendarHorarioComponent', () => {
  let component: AgendarHorarioComponent;
  let fixture: ComponentFixture<AgendarHorarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendarHorarioComponent]
    });
    fixture = TestBed.createComponent(AgendarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
