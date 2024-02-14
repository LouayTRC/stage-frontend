import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../../authentication/login/login.component';
import { SignupComponent } from '../../authentication/signup/signup.component';
import { Client } from 'src/app/models/client';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-menu-c',
  templateUrl: './menu-c.component.html',
  styleUrls: ['./menu-c.component.css']
  
})
export class MenuCComponent {
  
  user:any
  constructor(private matDialog:MatDialog,private authService:AuthenticationService,private userService:UserService){}
  
  ngOnInit(){
    this.userService.user.subscribe((user)=>{
      this.user=user
    })
  }

  openLoginPopup(){
    this.matDialog.closeAll()
    this.matDialog.open(LoginComponent)
  }
  openSignupPopup(){
    this.matDialog.closeAll()
    this.matDialog.open(SignupComponent)
  }
  logout(){
    this.authService.logout()
    this.userService.setUser(undefined)
  }
}
