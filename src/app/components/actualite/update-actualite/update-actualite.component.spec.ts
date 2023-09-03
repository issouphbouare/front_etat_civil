import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActualiteComponent } from './update-actualite.component';

describe('UpdateActualiteComponent', () => {
  let component: UpdateActualiteComponent;
  let fixture: ComponentFixture<UpdateActualiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateActualiteComponent]
    });
    fixture = TestBed.createComponent(UpdateActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
