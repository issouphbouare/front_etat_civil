import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCercleComponent } from './add-cercle.component';

describe('AddCercleComponent', () => {
  let component: AddCercleComponent;
  let fixture: ComponentFixture<AddCercleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCercleComponent]
    });
    fixture = TestBed.createComponent(AddCercleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
