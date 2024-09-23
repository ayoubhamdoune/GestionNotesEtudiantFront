import { Etudiant } from './etudiant.model';

export class Matiere {
  id: number | undefined;
  nom: string | undefined;
  devoir1: number | undefined;
  devoir2: number | undefined;
  devoir3: number | undefined;
  coeff: number | undefined;
  noteMatiere: number | undefined;
  etudiant?: Etudiant;  // Référence à l'étudiant associé
}
