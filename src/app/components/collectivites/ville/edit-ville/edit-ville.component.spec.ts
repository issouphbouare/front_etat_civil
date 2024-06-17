import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVilleComponent } from './edit-ville.component';

describe('EditVilleComponent', () => {
  let component: EditVilleComponent;
  let fixture: ComponentFixture<EditVilleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVilleComponent]
    });
    fixture = TestBed.createComponent(EditVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
