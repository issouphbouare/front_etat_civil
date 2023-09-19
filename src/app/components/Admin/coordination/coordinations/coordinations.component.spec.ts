import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinationsComponent } from './coordinations.component';

describe('CoordinationsComponent', () => {
  let component: CoordinationsComponent;
  let fixture: ComponentFixture<CoordinationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordinationsComponent]
    });
    fixture = TestBed.createComponent(CoordinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
