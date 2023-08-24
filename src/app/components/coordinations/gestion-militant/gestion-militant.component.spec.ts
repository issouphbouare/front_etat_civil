import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMilitantComponent } from './gestion-militant.component';

describe('GestionMilitantComponent', () => {
  let component: GestionMilitantComponent;
  let fixture: ComponentFixture<GestionMilitantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionMilitantComponent]
    });
    fixture = TestBed.createComponent(GestionMilitantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
