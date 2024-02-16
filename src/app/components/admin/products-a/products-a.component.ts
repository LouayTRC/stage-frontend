import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { AddProductComponent } from '../../popups/add-product/add-product.component';
import { HttpHeaders } from '@angular/common/http';
import { UpdateProductComponent } from '../../popups/update-product/update-product.component';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-products-a',
  templateUrl: './products-a.component.html',
  styleUrls: ['./products-a.component.css']
})
export class ProductsAComponent {
  products!: Product[];
  headers!: HttpHeaders;
  categories!: Category[];
  textSearch: string = ""
  products2!: Product[]
  selectedcategory!: any
  constructor(private cservice: CategoryService, private pservice: ProductService, private dialogRef: MatDialog) { }

  ngOnInit() {
    this.cservice.getCategorys().subscribe((res) => {
      this.categories = res
    })
    this.pservice.getAllProducts().subscribe((res) => {
      this.products = res;
      this.products2 = structuredClone(this.products)
      console.log("ee", this.products);
    })
    const token = sessionStorage.getItem('Token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log("hea", this.headers);
  }
  openAddPopup() {
    this.dialogRef.open(AddProductComponent).afterClosed().subscribe((res) => {
      let p = res;
      p.category = this.searchCategory(this.categories, p.category)
      this.products.push(res)
    })
  }

  deleteProduct(p: Product) {
    this.pservice.deleteProduct(p, this.headers).subscribe((res) => {
      console.log("res", res);
      const index = this.products.indexOf(p);
      this.products.splice(index, 1);
    })
  }

  openUpdatePopup(p: Product) {
    this.dialogRef.open(UpdateProductComponent, {
      data: { product: p }
    }).afterClosed().subscribe((res) => {
      for (const product in this.products) {
        if (this.products[product]._id == res._id) {
          let category = res.category
          this.products[product] = res
          this.products[product].category = category
        }
      }
    })
  }
  searchCategory(categories: Category[], id: String) {
    let selected;
    for (const c of categories) {
      if (c._id == id) {
        selected = c;
        break
      }
    }
    return selected;
  }
  filter(event: any) {
    this.products = this.products2;

    if (this.selectedcategory) {
      this.products = this.products.filter(element => element.category._id == this.selectedcategory._id);
    }

    if (this.textSearch.trim() !== "") {
      this.products = this.products.filter(element => element.name.includes(this.textSearch));
    }
  }

  filter2(c: Category) {
    this.products = this.products2;

    if (this.selectedcategory == c) {
      this.selectedcategory = undefined
      if (this.textSearch.trim() !== "") {
        this.products = this.products.filter(element => element.name.includes(this.textSearch));
      }

    }
    else {
      this.products = this.products.filter(element => element.category._id == c._id);
      if (this.textSearch.trim() !== "") {
        this.products = this.products.filter(element => element.name.includes(this.textSearch));
      }
      this.selectedcategory = c;
    }


  }
  addCategory(c:String){
    if (c!="") {
      this.cservice.addCategory(c,this.headers).subscribe((res)=>{
        console.log("res",res);
        
        this.categories.push(res)
        this.textSearch=""
      })
    }
  }

}
