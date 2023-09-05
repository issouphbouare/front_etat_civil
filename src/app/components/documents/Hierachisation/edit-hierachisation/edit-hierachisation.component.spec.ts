import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHierachisationComponent } from './edit-hierachisation.component';

describe('EditHierachisationComponent', () => {
  let component: EditHierachisationComponent;
  let fixture: ComponentFixture<EditHierachisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditHierachisationComponent]
    });
    fixture = TestBed.createComponent(EditHierachisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
