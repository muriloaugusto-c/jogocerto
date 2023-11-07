import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecebidoComponent } from './recebido.component';

describe('RecebidoComponent', () => {
  let component: RecebidoComponent;
  let fixture: ComponentFixture<RecebidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecebidoComponent]
    });
    fixture = TestBed.createComponent(RecebidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
