import { Component, Input } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  user:any

  constructor(private uservice:UserService,private authService:AuthenticationService){}

  ngOnInit(){
    this.uservice.user.subscribe((user)=>{
      this.user=user
    })
  }
  logout(){
    this.authService.logout();
    this.uservice.setUser(undefined)
  }
}
