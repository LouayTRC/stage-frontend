import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environement';
import { Command } from '../models/command';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommandService {
  baseUrl=environment.apiUrl+'/cmmd'
  constructor(private bostagi:HttpClient) { }

  addCommand(products:any[], headers?: HttpHeaders):Observable<Command>{
    return this.bostagi.post<Command>(this.baseUrl,products,{ headers: headers })
  }

  getAllCommands(headers?: HttpHeaders):Observable<Command[]>{
    return this.bostagi.get<Command[]>(`${this.baseUrl}/myCommands`,{ headers: headers })
  }

  getCommandsByClient(headers?: HttpHeaders):Observable<Command[]>{
    return this.bostagi.get<Command[]>(`${this.baseUrl}/myCommands`,{ headers: headers })
  }

  acceptCommand(id:String,form:Command,headers?: HttpHeaders):Observable<Command>{
    return this.bostagi.put<Command>(`${this.baseUrl}/accept/${id}`,form,{ headers: headers })
  }

  refuseCommand(id:String,form:Command,headers?: HttpHeaders):Observable<Command>{
    return this.bostagi.put<Command>(`${this.baseUrl}/refuse/${id}`,form,{ headers: headers })
  }

  getCommandById(id:String,headers?: HttpHeaders):Observable<Command>{
    return this.bostagi.get<Command>(`${this.baseUrl}/${id}`,{ headers: headers })
  }

}
