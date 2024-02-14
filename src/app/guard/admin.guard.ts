import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = async (route, state) => {
  let result:any;
  let response=false
  const token=sessionStorage.getItem("Token")
  const authService=inject(AuthenticationService);
  const router=inject(Router);
  
  if (token) {
    
   await authService.verifyToken(token).toPromise().then((res)=>{
      console.log("res",res);
      if (res.login && res.data.user_Role=="ADMIN") {
        response= true
      }
      else {
        response= false;
        router.navigate(['/client']);
      }
    }).catch((error)=>{response=false})
    }
  else{
    response=false
    router.navigate(['/client']);
    
  }
  console.log("response",response);
  
  return response
};
