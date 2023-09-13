import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntegrationComponent } from './add-integration.component';

describe('AddIntegrationComponent', () => {
  let component: AddIntegrationComponent;
  let fixture: ComponentFixture<AddIntegrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddIntegrationComponent]
    });
    fixture = TestBed.createComponent(AddIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
