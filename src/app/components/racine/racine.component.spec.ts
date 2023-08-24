import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacineComponent } from './racine.component';

describe('RacineComponent', () => {
  let component: RacineComponent;
  let fixture: ComponentFixture<RacineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RacineComponent]
    });
    fixture = TestBed.createComponent(RacineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
