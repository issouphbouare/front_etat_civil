import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCercleComponent } from './edit-cercle.component';

describe('EditCercleComponent', () => {
  let component: EditCercleComponent;
  let fixture: ComponentFixture<EditCercleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCercleComponent]
    });
    fixture = TestBed.createComponent(EditCercleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
