import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environement';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productURL=environment.apiUrl+'/product'
  constructor(private bostagi:HttpClient) { }

  addProduct(form:Product, headers?: HttpHeaders):Observable<Product>{
    return this.bostagi.post<Product>(this.productURL,form,{ headers: headers })
  }

  getAllProducts():Observable<Product[]>{
    return this.bostagi.get<Product[]>(this.productURL)
  }

  getProductById(id:String):Observable<Product>{
    return this.bostagi.get<Product>(`${this.productURL}/${id}`)
  }

  updateProduct(form:Product, headers?: HttpHeaders):Observable<Product>{
    return this.bostagi.put<Product>(`${this.productURL}/${form._id}`,form,{ headers: headers })
  }

  deleteProduct(form:Product, headers?: HttpHeaders):Observable<any>{
    return this.bostagi.delete<any>(`${this.productURL}/${form._id}`,{ headers: headers });
  }

  listProducts(idProducts:any[]):Observable<Product[]>{
    return this.bostagi.post<Product[]>(`${this.productURL}/list`,idProducts)
  }
}
