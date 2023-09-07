import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMilitantComponent } from './add-militant.component';

describe('AddMilitantComponent', () => {
  let component: AddMilitantComponent;
  let fixture: ComponentFixture<AddMilitantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMilitantComponent]
    });
    fixture = TestBed.createComponent(AddMilitantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
