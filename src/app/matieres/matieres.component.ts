import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {GestionService} from "../services/gestion.service";
import {AuthenticationService} from "../services/authentication.service";
import {AppUser} from "../model/user.model";

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent implements OnInit{

  public matieres:any;
  public somme:number=0;
  public sommeCoeff:number=0;
  public size:number=10;
  public currentPage:number=0;
  public totalPages:number=0;

  public pages: Array<number> | undefined;

  public bulletin:any;
  public inis:number=0;


  constructor(private gestionService:GestionService,private authService:AuthenticationService,private httpClient: HttpClient) {
  }
  ngOnInit() {
    this.onGetMatieres() ;
  }
  public authenticatedID=this.authService.authenticatedUser?.id;

  onGetMatieres() {
this.httpClient.get("http://localhost:8080/matieres/search/findByEtudiantId?id="+this.authenticatedID)
  .subscribe((data)=>{this.matieres=data;});

    /*this.gestionService.getMatiere(this.currentPage,this.size)
      .subscribe(data=>{
        this.totalPages=data["page"].totalPages;
        this.pages=new Array<number>(this.totalPages);
        this.matieres=data;
        console.log(data);
        for (let m of this.matieres._embedded.matieres){
        this.httpClient.get("http://localhost:8080/matieres/"+ m.id+"/etudiant")
                     .subscribe((data)=>{this.isetudiant=data;});
        if(this.isetudiant.id==this.authenticatedID){
          this.userMatiers=m;
        }

       }
      },error => {
        console.log(error);
      })
*/
  }
  calculerBulletin() {
    for (let mn of this.matieres._embedded.matieres) {
      console.log(mn.nom);
      this.somme= this.somme +((mn.noteMatiere)*(mn.coeff));
      this.sommeCoeff=this.sommeCoeff+(mn.coeff);

      console.log(mn.noteMatiere +"hh"+ mn.coeff +"hh"+ mn.coeff*mn.noteMatiere);
      this.inis=this.inis+1;

    }

    this.bulletin=((this.somme)/this.sommeCoeff).toFixed(2);



    }


  onPageMatiere(i: number) {
  this.currentPage=i;
  this.onGetMatieres();
  }

}
