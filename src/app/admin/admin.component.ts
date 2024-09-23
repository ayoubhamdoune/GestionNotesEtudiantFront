import { Component } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import { createUnparsedSourceFile } from 'typescript';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
   // Récupération de l'objet JSON sous forme de chaîne
role:any;
isAdmin:boolean | undefined;
isUser:boolean | undefined;


  constructor(public authService:AuthenticationService,private router:Router) {
  }
  ngOnInit(){

    let authUserString = localStorage.getItem('authUser');

    // Parsing de la chaîne JSON en objet
    let authUser = authUserString ? JSON.parse(authUserString) : null;

    // Accès à la propriété 'role' de l'objet
    this.role = authUser ? authUser.role : null;
    console.log(this.role);
     // Devrait afficher 'etudiant'
     if(this.role=='admin'){
          this.isAdmin=true;
     }else{
      this.isAdmin=false;
     }
     if(this.role=='etudiant'){
      this.isUser=true;
      }else{
      this.isUser=false;
      }
     console.log(this.isAdmin);
     console.log(this.isUser);

  }

  handleLogout() {
     this.authService.logout().subscribe({
       next:(data)=>{
         this.router.navigateByUrl("")
       }
     })
  }
}
