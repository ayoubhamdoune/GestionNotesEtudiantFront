import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {GestionService} from "../services/gestion.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent implements OnInit {
  public etudiants: any;
  public size: number = 10;
  public currentPage: number = 0;
  public totalPages: number = 0;
  public pages: Array<number> | undefined;
  private currentKeyword: string = "";


  constructor(private gestionService: GestionService,private router: Router ) {
  }

  ngOnInit() {
    this.onGetEtudiants();
  }

  onGetEtudiants() {
    this.gestionService.getEtudiant(this.currentPage, this.size)
      .subscribe(data => {
        this.etudiants = data;
        this.totalPages = data["page"].totalPages;
        this.pages = new Array<number>(this.totalPages);
      }, error => {
        console.log(error);
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
        this.etudiants = data;
        this.totalPages = data["page"].totalPages;
        this.pages = new Array<number>(this.totalPages);
      }, error => {
        console.log(error);
      });
  }

  onDeleteEtudiant(p:any) {
    let conf = confirm("Etes vous sûre?");
    if (conf) {
      this.gestionService.deleteResource(p._links.etudiant.href)
        .subscribe(data=>{
        this.chercherEtudiant();
          },error=>{
          console.log(error)

          })

    }
  }

  onEditEtudiant(e: any) {
    let url = e._links.self.href;
    this.router.navigateByUrl("/admin/edit-etudiant/" + btoa(url));

  }
}
