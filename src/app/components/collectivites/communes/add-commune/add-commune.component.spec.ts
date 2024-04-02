import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommuneComponent } from './add-commune.component';

describe('AddCommuneComponent', () => {
  let component: AddCommuneComponent;
  let fixture: ComponentFixture<AddCommuneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCommuneComponent]
    });
    fixture = TestBed.createComponent(AddCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
