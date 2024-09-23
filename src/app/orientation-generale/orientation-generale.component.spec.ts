import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientationGeneraleComponent } from './orientation-generale.component';

describe('OrientationGeneraleComponent', () => {
  let component: OrientationGeneraleComponent;
  let fixture: ComponentFixture<OrientationGeneraleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrientationGeneraleComponent]
    });
    fixture = TestBed.createComponent(OrientationGeneraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
