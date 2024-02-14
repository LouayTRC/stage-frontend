import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environement';
import { Observable } from 'rxjs';
import { Favorites } from '../models/favorites';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  baseUrl=environment.apiUrl+"/favorites"
  constructor(private bostagi:HttpClient) { }

  createPlaylist(name:any, headers?: HttpHeaders):Observable<Favorites>{
    return this.bostagi.post<Favorites>(`${this.baseUrl}/create`,name,{ headers: headers })
  }

  addProduct(id:String,p:Product, headers?: HttpHeaders):Observable<Favorites>{
    return this.bostagi.put<Favorites>(`${this.baseUrl}/${id}`,p,{ headers: headers })
  }

  getPlaylists(headers?: HttpHeaders):Observable<Favorites[]>{
    return this.bostagi.get<Favorites[]>(this.baseUrl,{ headers: headers })
  }

  getPlaylistById(id:String,headers?: HttpHeaders):Observable<Favorites>{
    return this.bostagi.get<Favorites>(`${this.baseUrl}/${id}`,{ headers: headers })
  }

  deleteProduct(id:String,i:number,headers?: HttpHeaders):Observable<any>{
    return this.bostagi.delete(`${this.baseUrl}/${id}/${i}`,{ headers: headers });
  }

  deletePlaylist(id:String,headers?: HttpHeaders):Observable<any>{
    return this.bostagi.delete(`${this.baseUrl}/${id}`,{ headers: headers });
  }

}
