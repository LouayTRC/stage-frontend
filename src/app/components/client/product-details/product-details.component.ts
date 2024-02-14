import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterConfigOptions } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { SaveProductComponent } from '../../popups/save-product/save-product.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product!: Product
  productCmmd!: any
  idProduct!: String
  constructor(private active: ActivatedRoute, private pservice: ProductService, private dialogRef: MatDialog,private router:Router) { }

  ngOnInit() {
    this.idProduct = this.active.snapshot.params['id'];
    console.log("is", this.idProduct);
    this.pservice.getProductById(this.idProduct).subscribe((res) => {
      this.product = res
      console.log('pp', this.product);

    })
  }

  addToCart() {
    const panier = JSON.parse(sessionStorage.getItem("panier") || '[]');
    this.productCmmd = {
      idProduct: this.idProduct,
      qte: this.product.qte
    }
    panier.push(this.productCmmd)

    sessionStorage.setItem("panier", JSON.stringify(panier));
    console.log("panier", panier);

  }
  openSavePopup() {
    this.dialogRef.open(SaveProductComponent, {
      width: '400px',
      height: '600px',
      data: { product: this.product }
    })
  }
  goProducts(){
    this.router.navigate(['/client/products'])
  }
}

