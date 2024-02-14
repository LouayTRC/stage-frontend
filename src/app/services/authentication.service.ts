import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environement';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl=environment.apiUrl
  constructor(private bostagi:HttpClient,private router:Router) { }

  signup(form:Client):Observable<Client>{
    return this.bostagi.post<Client>(this.baseUrl+'/auth/signup',form)
  }

  login(form:any):Observable<any>{
    return this.bostagi.post<any>(this.baseUrl+"/auth/login",form)
  }

  logout(){
    sessionStorage.removeItem("Token");
    this.router.navigate(["/client"])
  }

  verifyToken(token:string):Observable<any>{
    return this.bostagi.post<any>(this.baseUrl+"/auth/verify",{token});
  }


}
