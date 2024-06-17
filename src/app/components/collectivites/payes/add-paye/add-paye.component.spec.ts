import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayeComponent } from './add-paye.component';

describe('AddPayeComponent', () => {
  let component: AddPayeComponent;
  let fixture: ComponentFixture<AddPayeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPayeComponent]
    });
    fixture = TestBed.createComponent(AddPayeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
