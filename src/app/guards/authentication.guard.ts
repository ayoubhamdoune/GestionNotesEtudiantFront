import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
constructor(private authService:AuthenticationService, private router:Router) {
}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let authenticated=this.authService.isAuthenticated();

    if (authenticated == false ) {
this.router.navigateByUrl("");
      alert("merci d'authentifier");



      return false;

    }else {


      return true;
    }


  }
}
