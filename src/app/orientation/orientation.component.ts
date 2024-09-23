
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { GestionService } from '../services/gestion.service';

@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.css']
})
export class OrientationComponent {
  showParagraph: boolean = false;
  public matieres:any;
  public pages: Array<number> | undefined;
  public bulletin:any;
  public somme:number=0;
  public inis:number=0;
  public noteSm:number=0;
  public noteSe:number=0;
  public noteSt:number=0;
  public noteEco:number=0;
  public orientationMessage:string ='';
  public nonOrientationMessage:string ="Aucune orientation correspondante trouvée.";


  

  public sommeCoeff:number=0;
  public size:number=10;
  public currentPage:number=0;
  public totalPages:number=0;



  constructor(private gestionService:GestionService,public authService:AuthenticationService,private router:Router,private httpClient: HttpClient) {
  }
  ngOnInit() {
    this.onGetMatieres();
  }
  public authenticatedID=this.authService.authenticatedUser?.id;

  onGetMatieres() {
this.httpClient.get("http://localhost:8080/matieres/search/findByEtudiantId?id="+this.authenticatedID)
  .subscribe((data)=>{this.matieres=data;});
   console.log(this.matieres._embedded.matieres);

  }



  onMonOrientationClick(): void {

    this.calculerOrt();
    // Logique pour "Mon orientation"
    console.log('Mon orientation button clicked');
    // Afficher le paragraphe
    if(this.showParagraph){
      this.showParagraph = false;
    }else{
      this.showParagraph = true;
    }

  }
  calculerOrt() {
    for (let mn of this.matieres._embedded.matieres) {
console.log(mn.nom);
/*----------------------------------------------------*/

      if(mn.nom=='Mathématiques'){
        console.log(mn.nom,mn.noteMatiere);
        this.noteSm=this.noteSm + (mn.noteMatiere)*9 ;
      }
      if(mn.nom=='Physique et Chimie'){
        this.noteSm=this.noteSm + (mn.noteMatiere)*8 ;
      }
      if(mn.nom=='Sciences de la Vie et de la Terre'){
        this.noteSm=this.noteSm + (mn.noteMatiere)*4 ;
      }
      if(mn.nom=='Français'){
        this.noteSm=this.noteSm + (mn.noteMatiere)*5 ;
      }
/*---------------------------------------------------- */
      if(mn.nom=='Mathématiques'){
        console.log(mn.nom,mn.noteMatiere);
        this.noteSe=this.noteSe + (mn.noteMatiere)*7 ;
      }
      if(mn.nom=='Sciences de la Vie et de la Terre'){
        this.noteSe=this.noteSe + (mn.noteMatiere)*7 ;
      }
      if(mn.nom=='Physique et Chimie'){
        this.noteSe=this.noteSe + (mn.noteMatiere)*7 ;
      }
      if(mn.nom=='Français'){
        this.noteSe=this.noteSe + (mn.noteMatiere)*5 ;
      }
/*---------------------------------------------------- */

      if(mn.nom=="Sciences de l'ingénieur"){
        console.log(mn.nom,mn.noteMatiere);
        this.noteSt=this.noteSt + (mn.noteMatiere)*9 ;
      }
      if(mn.nom=='Physique et Chimie'){
        this.noteSt=this.noteSt + (mn.noteMatiere)*6 ;
      }
      if(mn.nom=='Mathématiques'){
        this.noteSt=this.noteSt + (mn.noteMatiere)*6 ;
      }
      if(mn.nom=='Français'){
        this.noteSt=this.noteSt + (mn.noteMatiere)*5 ;
      }
/*---------------------------------------------------- */
      if(mn.nom=='Mathématiques'){
        console.log(mn.nom,mn.noteMatiere);
        this.noteEco=this.noteEco + (mn.noteMatiere)*7 ;
      }
      if(mn.nom=='Français'){
        this.noteEco=this.noteEco + (mn.noteMatiere)*7 ;
      }
      if(mn.nom=='Anglais'){
        this.noteEco=this.noteEco + (mn.noteMatiere)*5 ;
      }
      if(mn.nom=='Histoire et Géographie'){
        this.noteEco=this.noteEco + (mn.noteMatiere)*7 ;
      }







    }
    function maxOfFour(a: number, b: number, c: number, d: number): number {
      let maxVal = a;  // Supposons que 'a' est le maximum au départ

      if (b > maxVal) {
          maxVal = b;
      }
      if (c > maxVal) {
          maxVal = c;
      }
      if (d > maxVal) {
          maxVal = d;
      }

      return maxVal;
  }


  const resultat: number = maxOfFour(this.noteSm, this.noteEco, this.noteSe, this.noteSt);
  console.log("La valeur maximale est :", resultat);
    let messages: string[] = [];

    if (this.noteSm === resultat) {
      messages.push("Science Mathématique");
    }
    if (this.noteEco === resultat) {
      messages.push("Économie");
    }
    if (this.noteSe === resultat) {
      messages.push("Sciences Expérimentales");
    }
    if (this.noteSt === resultat) {
      messages.push("Sciences Techniques");
    }

    if (messages.length > 0) {
      this.orientationMessage = "Selon nos calculs, nous vous recommandons vivement de suivre la ou les filières suivantes : " + messages.join(' et ');
    } else {
      this.orientationMessage = "Aucune orientation correspondante trouvée.";
    }

    console.log(this.orientationMessage);





    }

  onOrientationGeneralClick(): void {
    // Logique pour "Orientation Générale"
    this.router.navigate(['/admin/orientation-generale']);
    console.log('Orientation Générale button clicked');
    // Rediriger ou effectuer une autre action
  }
}
