import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceitarAgendamentosComponent } from './aceitar-agendamentos.component';

describe('AceitarAgendamentosComponent', () => {
  let component: AceitarAgendamentosComponent;
  let fixture: ComponentFixture<AceitarAgendamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AceitarAgendamentosComponent]
    });
    fixture = TestBed.createComponent(AceitarAgendamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
