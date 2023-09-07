import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilitantsComponent } from './militants.component';

describe('MilitantsComponent', () => {
  let component: MilitantsComponent;
  let fixture: ComponentFixture<MilitantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MilitantsComponent]
    });
    fixture = TestBed.createComponent(MilitantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
