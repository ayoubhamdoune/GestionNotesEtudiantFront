import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesMatieresEtudComponent } from './notes-matieres-etud.component';

describe('NotesMatieresEtudComponent', () => {
  let component: NotesMatieresEtudComponent;
  let fixture: ComponentFixture<NotesMatieresEtudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesMatieresEtudComponent]
    });
    fixture = TestBed.createComponent(NotesMatieresEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
