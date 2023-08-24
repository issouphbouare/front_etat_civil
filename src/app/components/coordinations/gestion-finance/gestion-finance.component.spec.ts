import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFinanceComponent } from './gestion-finance.component';

describe('GestionFinanceComponent', () => {
  let component: GestionFinanceComponent;
  let fixture: ComponentFixture<GestionFinanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionFinanceComponent]
    });
    fixture = TestBed.createComponent(GestionFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
