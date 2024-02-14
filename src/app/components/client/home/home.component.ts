import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products!:Product[]
  constructor(private pservice:ProductService){}

  ngOnInit(){
    this.pservice.getAllProducts().subscribe((res)=>{
      this.products=res
      console.log("products",this.products);
      
    })
  }
}
