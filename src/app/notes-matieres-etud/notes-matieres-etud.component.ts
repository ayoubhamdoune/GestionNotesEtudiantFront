import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GestionService } from '../services/gestion.service';
import {Router} from "@angular/router";



@Component({
  selector: 'app-notes-matieres-etud',
  templateUrl: './notes-matieres-etud.component.html',
  styleUrls: ['./notes-matieres-etud.component.css']
})
export class NotesMatieresEtudComponent implements OnInit {
  public matieres: any;
  public etudiants: any;
  public allmats: any;
  public size: number = 10;
  public currentPage: number = 0;
  public totalPages: number = 0;
  public pages: Array<number> | undefined;
  private currentKeyword: string = "";


constructor(private gestionService: GestionService,private httpClient:HttpClient,private router: Router) { }

ngOnInit(): void {
  //this.getMatieres();
  this.getEtudiants();

}



getEtudiants() {
  this.gestionService.getEtudiant(0, 10).subscribe(data => {
    this.etudiants = data._embedded.etudiants;
    console.log("Etudiants:", this.etudiants);
    this.allmats = this.etudiants.map((e: any) => ({ etudiant: e, matieres: [] }));

  // Log pour vérifier les données
  for(let e of this.etudiants){
  this.httpClient.get("http://localhost:8080/matieres/search/findByEtudiantId?id="+e.id)
  .subscribe((data1:any)=>{
    // this.allmats = this.allmats.concat(data1._embedded.matieres);

    const etudiantMats = this.allmats.find((em:any) => em.etudiant.id === e.id);
    if (etudiantMats) {
        etudiantMats.matieres = data1._embedded.matieres;
    }
    console.log("data1",data1);});
  }
  console.log("matiers",this.allmats);

  }, error => {
    console.error("Erreur lors de la récupération des étudiants:", error);
  });
}



  onPageEtudiant(i: number) {
    this.currentPage = i;
    this.chercherEtudiant();

  }

  onChercher(form: any) {
    this.currentPage = 0;
    this.currentKeyword = form.keyword;
    this.chercherEtudiant()

  }

  chercherEtudiant() {
    this.gestionService.getEtudiantsByKeyword(this.currentKeyword, this.currentPage, this.size)
      .subscribe(data => {
        this.etudiants = data._embedded.etudiants;
        this.allmats = this.etudiants.map((e: any) => ({ etudiant: e, matieres: [] }));

        // Log pour vérifier les données
        for(let e of this.etudiants){
          this.httpClient.get("http://localhost:8080/matieres/search/findByEtudiantId?id="+e.id)
            .subscribe((data1:any)=>{
              // this.allmats = this.allmats.concat(data1._embedded.matieres);

              const etudiantMats = this.allmats.find((em:any) => em.etudiant.id === e.id);
              if (etudiantMats) {
                etudiantMats.matieres = data1._embedded.matieres;
              }
              console.log("data1",data1);});
        }
        console.log("matiers",this.allmats);


        //this.totalPages = data["page"].totalPages;
       // this.pages = new Array<number>(this.totalPages);
      }, error => {
        console.log(error);
      });
  }

  /*chercherMatiere() {
    this.gestionService.getMatieresByKeyword(this.currentKeyword, this.currentPage, this.size)
      .subscribe(data => {
        this.matieres = data;
        this.totalPages = data["page"].totalPages;
        this.pages = new Array<number>(this.totalPages);
      }, error => {
        console.log(error);
      });
  }*/


  onDeleteMatiere(p:any) {
    let conf = confirm("Etes vous sûre?");
    if (conf) {
      this.gestionService.deleteResource1(p._links.self.href)
        .subscribe(data=>{
         // this.chercherMatiere();
          this.getEtudiants();
        },error=>{
          console.log(error)

        })

    }
  }

  onEditMatiere(e: any) {
    let url = e._links.self.href;
    this.router.navigateByUrl("/admin/edit-matiere/" + btoa(url));

  }











}




