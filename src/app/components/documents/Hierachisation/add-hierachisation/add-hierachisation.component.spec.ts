import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHierachisationComponent } from './add-hierachisation.component';

describe('AddHierachisationComponent', () => {
  let component: AddHierachisationComponent;
  let fixture: ComponentFixture<AddHierachisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHierachisationComponent]
    });
    fixture = TestBed.createComponent(AddHierachisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
