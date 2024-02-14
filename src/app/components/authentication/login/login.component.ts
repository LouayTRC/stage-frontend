import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUser!:FormGroup

  constructor(private fb:FormBuilder,private auth:AuthenticationService,private matDialog:MatDialog,private userService:UserService,private router:Router){}
  
  ngOnInit(){
    this.loginUser=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }
  get Username(){
    return this.loginUser.controls['username'];
  }
  get Password(){
    return this.loginUser.controls['password'];
  }

  login(){
    console.log("user",this.loginUser.value);
    this.auth.login(this.loginUser.value).subscribe((res)=>{
      console.log("res",res);
      sessionStorage.setItem('Token',res.token);
      this.userService.setUser(res.user)
      if (res.user.role=="ADMIN") {
        this.router.navigate(['/dashboard'])
      }
      this.matDialog.closeAll()
    })
  }

  closePopup(){
    this.matDialog.closeAll()
  }
}
