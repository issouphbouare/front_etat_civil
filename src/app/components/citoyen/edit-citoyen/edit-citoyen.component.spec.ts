import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCitoyenComponent } from './edit-citoyen.component';

describe('EditCitoyenComponent', () => {
  let component: EditCitoyenComponent;
  let fixture: ComponentFixture<EditCitoyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCitoyenComponent]
    });
    fixture = TestBed.createComponent(EditCitoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
