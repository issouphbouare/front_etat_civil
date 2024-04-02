import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCitoyenComponent } from './add-citoyen.component';

describe('AddCitoyenComponent', () => {
  let component: AddCitoyenComponent;
  let fixture: ComponentFixture<AddCitoyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCitoyenComponent]
    });
    fixture = TestBed.createComponent(AddCitoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
