import { Component } from '@angular/core';
import {Etudiant} from "../model/etudiant.model";
import {ActivatedRoute, Router} from "@angular/router";
import {GestionService} from "../services/gestion.service";
import {Matiere} from "../model/matiere.model";

@Component({
  selector: 'app-edit-matiere',
  templateUrl: './edit-matiere.component.html',
  styleUrls: ['./edit-matiere.component.css']
})
export class EditMatiereComponent {
  protected currentMatiere: Matiere = new Matiere();
  private url: string | undefined;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private gestionService: GestionService) {
  }
  ngOnInit() {
    const encodedUrl = this.activatedRoute.snapshot.params['id'];
    this.url = atob(encodedUrl);
    console.log('Decoded URL:', this.url); // Pour débogage

    if (this.url) {
      this.gestionService.getResource(this.url)
        .subscribe(data => {
          this.currentMatiere = data;
          console.log('Loaded Matiere:', this.currentMatiere); // Pour débogage
        }, error => {
          console.log(error);
        });
    } else {
      console.error('URL is undefined');
    }
  }

  onUpdateMatiere(value: any) {
    console.log('Form values:',value); // Pour débogage

    if (this.url && this.currentMatiere) {
      value.noteMatiere=(value.devoir1+value.devoir2+value.devoir3)/3
      const updatedMatiere = { ...this.currentMatiere, ...value };
      console.log('Updated Matiere:', updatedMatiere); // Pour débogage

      this.gestionService.updateResource(this.url, updatedMatiere)
        .subscribe(
          data => {
            alert('Mise à jour effectuée avec succès');
            this.router.navigateByUrl('/admin/matieres');
          },
          error => {
            console.log(error);
          }
        );
    } else {
      console.error('URL or currentMatiere is undefined');
    }
  }



}
