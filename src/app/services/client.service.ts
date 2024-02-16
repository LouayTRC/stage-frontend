import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environement';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl=environment.apiUrl+"/client"
  constructor(private bostagi:HttpClient) { }

  getAllClients(headers?: HttpHeaders):Observable<Client[]>{
    return this.bostagi.get<Client[]>(this.baseUrl+"/all",{ headers: headers })
  }

  getClient(headers?: HttpHeaders):Observable<Client>{
    return this.bostagi.get<Client>(this.baseUrl,{ headers: headers })
  }

  updateClient(id:String,form:Client,headers?: HttpHeaders):Observable<Client>{
    return this.bostagi.put<Client>(`${this.baseUrl}/${id}`,form,{ headers: headers })
  }

  changePassword(form:any,headers?: HttpHeaders):Observable<Client>{
    return this.bostagi.put<Client>(`${this.baseUrl}/pwd`,form,{ headers: headers })
  }
}
