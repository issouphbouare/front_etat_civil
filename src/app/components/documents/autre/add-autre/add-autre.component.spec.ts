import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAutreComponent } from './add-autre.component';

describe('AddAutreComponent', () => {
  let component: AddAutreComponent;
  let fixture: ComponentFixture<AddAutreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAutreComponent]
    });
    fixture = TestBed.createComponent(AddAutreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
