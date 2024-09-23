import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  userFormGroup!:FormGroup;
  errorMessage:any;

  constructor(private fb:FormBuilder, private autService:AuthenticationService, private router:Router) {
  }
ngOnInit() {
  localStorage.clear;
  this.router.navigateByUrl("");
    this.userFormGroup=this.fb.group({
      username:this.fb.control(""),
      password:this.fb.control(""),
      role:this.fb.control("")
    });

}

  handleLogin() {
    let username=this.userFormGroup.value.username;
    let password=this.userFormGroup.value.password;
    let role=this.userFormGroup.value.role;
    this.autService.login(username,password,role).subscribe({
      next:(appUser)=>{
        if( appUser==undefined){
          this.router.navigateByUrl("");
        }

       this.autService.authenticateUser(appUser,role).subscribe({
         next:(data)=>{
          if( appUser==undefined){
            this.router.navigateByUrl("");
          }
           this.router.navigateByUrl("/admin/home");


         }
       })
      },
      error:(err)=>{
        this.errorMessage=err;
    }
    })
  }
}
