import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitoyenComponent } from './citoyen.component';

describe('CitoyenComponent', () => {
  let component: CitoyenComponent;
  let fixture: ComponentFixture<CitoyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitoyenComponent]
    });
    fixture = TestBed.createComponent(CitoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
