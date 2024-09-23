import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEtudiantComponent } from './new-etudiant.component';

describe('NewEtudiantComponent', () => {
  let component: NewEtudiantComponent;
  let fixture: ComponentFixture<NewEtudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewEtudiantComponent]
    });
    fixture = TestBed.createComponent(NewEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
