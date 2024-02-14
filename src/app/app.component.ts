import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stageP';
  constructor(private userService:UserService, private authService:AuthenticationService){
    
    this.loadClient()

  }

  async loadClient(){
    const token=sessionStorage.getItem("Token")

    if (token) {
      
     await this.authService.verifyToken(token).toPromise().then((res)=>{
       
        if (res.login) {
         this.userService.setUser(res.data) 
        }
        
      }).catch((error)=>{
        this.authService.logout()
        this.userService.setUser(undefined)
      })
      }
  }
}
