import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environement';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl=environment.apiUrl+"/category";
  
  constructor(private bostagi:HttpClient) { }

  addCategory(name:String,headers?: HttpHeaders):Observable<Category>{
    return this.bostagi.post<Category>(this.baseUrl,{name},{ headers: headers })
  }

  getCategorys():Observable<Category[]>{
    return this.bostagi.get<Category[]>(this.baseUrl)
  }

  deleteCategory(id:String){
    this.bostagi.delete(`${this.baseUrl}/${id}`)
  }
  
}
