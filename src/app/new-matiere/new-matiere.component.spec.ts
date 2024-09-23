import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMatiereComponent } from './new-matiere.component';

describe('NewMatiereComponent', () => {
  let component: NewMatiereComponent;
  let fixture: ComponentFixture<NewMatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMatiereComponent]
    });
    fixture = TestBed.createComponent(NewMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
