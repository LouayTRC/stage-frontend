import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../../authentication/login/login.component';
import { SignupComponent } from '../../authentication/signup/signup.component';
import { Client } from 'src/app/models/client';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateClientComponent } from '../../popups/update-client/update-client.component';
import { ClientService } from 'src/app/services/client.service';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-menu-c',
  templateUrl: './menu-c.component.html',
  styleUrls: ['./menu-c.component.css']
  
})
export class MenuCComponent {
  client!:any
  user:any
  headers!: HttpHeaders;  
  constructor(private matDialog:MatDialog,private userService:UserService,private cservice:ClientService,private authService:AuthenticationService){}
  
  ngOnInit(){

    this.userService.user.subscribe((user)=>{
      this.user=user
      console.log({user})
      if(user){
        const token=sessionStorage.getItem('Token')
      
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
      this.cservice.getClient(this.headers).subscribe((res)=>{
        this.client=res;
          
      })
    }

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
    this.client=undefined
    this.authService.logout()
    this.userService.setUser(undefined)
  }
  openUpdateClientPopup(){
    this.matDialog.closeAll()
    this.matDialog.open(UpdateClientComponent,{
      data:{client:this.client}
    })
  }
}
