import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCondamnationComponent } from './add-condamnation.component';

describe('AddCondamnationComponent', () => {
  let component: AddCondamnationComponent;
  let fixture: ComponentFixture<AddCondamnationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCondamnationComponent]
    });
    fixture = TestBed.createComponent(AddCondamnationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
