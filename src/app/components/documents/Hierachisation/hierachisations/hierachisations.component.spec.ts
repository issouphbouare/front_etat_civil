import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierachisationsComponent } from './hierachisations.component';

describe('HierachisationsComponent', () => {
  let component: HierachisationsComponent;
  let fixture: ComponentFixture<HierachisationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HierachisationsComponent]
    });
    fixture = TestBed.createComponent(HierachisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
