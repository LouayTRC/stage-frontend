import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!:Product

  constructor(private router:Router){}

  ngOnInit(){

  }
  checkProductDetails(p:Product){
    this.router.navigate(["/client/products",p._id])
  }
}
