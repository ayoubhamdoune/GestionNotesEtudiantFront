import { Component } from '@angular/core';
import {GestionService} from "../services/gestion.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import { Router } from "@angular/router";
import {Etudiant} from "../model/etudiant.model";


@Component({
  selector: 'app-new-etudiant',
  templateUrl: './new-etudiant.component.html',
  styleUrls: ['./new-etudiant.component.css']
})
export class NewEtudiantComponent {
  private data: any;
  protected currentEtudiant: Etudiant | undefined ;
  protected mode : number=1;

  constructor(private gestionService: GestionService,private router: Router) {
  }

  ngOnInit() {

  }

  onSaveEtudiant(value: any) {
    console.log(value);  // Ajoutez cette ligne pour vérifier les données envoyées
    this.gestionService.saveResource(value)
      .subscribe(
        (res: any) => {
          //this.router.navigateByUrl("/etudiants");
          this.currentEtudiant = res;
          this.mode=2;
          console.log('Etudiant ajouté avec succès:', res);
        },
        (error: any) => {
          console.error("Erreur lors de l'ajout de l'etudiant:", error);
        }
      );
  }


  onNewEtudiant() {
    this.mode = 1;
  }
}
