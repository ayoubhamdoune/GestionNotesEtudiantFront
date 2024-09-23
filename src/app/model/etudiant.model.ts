import { Matiere } from './matiere.model';

export class Etudiant {
  id: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  niveau: string | undefined;
  classe: string | undefined;
  matieres?: Matiere[];  // Liste des matières associées à cet étudiant
}
