import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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

}


}
