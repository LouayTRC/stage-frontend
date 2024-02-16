import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Command } from 'src/app/models/command';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products!:Product[];
  products2!:Product[];
  textSearch: string = ""
  categories!:Category[];
  constructor(private pservice:ProductService,private cservice:CategoryService){}

  ngOnInit(){
    this.cservice.getCategorys().subscribe((res)=>{
      this.categories=res;
    })

    this.pservice.getAllProducts().subscribe((res)=>{
      this.products=res;
      this.products2=structuredClone(this.products)
    })
  }
  filter(event: any) {
    this.products = this.products2;
    if (this.textSearch.trim() !== "") {
      this.products = this.products.filter(element => element.name.includes(this.textSearch));
    }
    
  }
}
