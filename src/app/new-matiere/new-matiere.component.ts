import { Component } from '@angular/core';
import { GestionService } from "../services/gestion.service";
import { Router } from "@angular/router";
import { Matiere } from "../model/matiere.model";
import { Etudiant } from "../model/etudiant.model";

@Component({
  selector: 'app-new-matiere',
  templateUrl: './new-matiere.component.html',
  styleUrls: ['./new-matiere.component.css']
})
export class NewMatiereComponent {
  private data: any;
  protected currentMatiere: Matiere = new Matiere();
  protected mode: number = 1;

  constructor(private gestionService: GestionService, private router: Router) { }

  ngOnInit() { }

  onSaveMatiere(value: any) {
    // Fetch the Etudiant by ID first
    this.gestionService.getEtudiantById(value.etudiant).subscribe(
      (etudiant: Etudiant) => {
        // Assign the fetched Etudiant to the new Matiere
        this.currentMatiere.etudiant = etudiant;
        this.currentMatiere.nom = value.nom;
        this.currentMatiere.devoir1 = value.devoir1;
        this.currentMatiere.devoir2 = value.devoir2;
        this.currentMatiere.devoir3 = value.devoir3;
        this.currentMatiere.coeff = value.coeff;

        // Save the Matiere
        this.gestionService.saveResource1(this.currentMatiere).subscribe(
          (res: any) => {
            this.currentMatiere = res;
            this.mode = 2;
            console.log('Matiere ajoutée avec succès:', res);
            this.router.navigateByUrl("/admin/notes-matieres-etud");
          },
          (error: any) => {
            console.error("Erreur lors de l'ajout de Matiere:", error);
          }
        );
      },
      (error: any) => {
        console.error("Erreur lors de la récupération de l'étudiant:", error);
      }
    );
  }

  onNewMatiere() {
    this.mode = 1;
  }
}
