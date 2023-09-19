import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoordinationComponent } from './add-coordination.component';

describe('AddCoordinationComponent', () => {
  let component: AddCoordinationComponent;
  let fixture: ComponentFixture<AddCoordinationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCoordinationComponent]
    });
    fixture = TestBed.createComponent(AddCoordinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
