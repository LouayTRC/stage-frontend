import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environement';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new BehaviorSubject<any>(null)
  getUser=this.user.asObservable()

  baseUrl=environment.apiUrl+'/client'
  constructor(private bostagi:HttpClient) { }

  getAllClients():Observable<Client[]>{
    return this.bostagi.get<Client[]>(this.baseUrl)
  }
  
  setUser(client:any){
    this.user.next(client)
  }
}
