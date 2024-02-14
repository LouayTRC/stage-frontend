import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environement';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl=environment.apiUrl+"/admin"
  constructor(private bostagi:HttpClient) { }

  getAllAdmins(headers?: HttpHeaders):Observable<Admin[]>{
    return this.bostagi.get<Admin[]>(this.baseUrl,{ headers: headers })
  }
}
