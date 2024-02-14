import { HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  headers!: HttpHeaders;
  categories!:Category[]
  category!:Category
  file!:File
  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,private pservice:ProductService,private matDialogRef:MatDialogRef<UpdateProductComponent>,private cservice:CategoryService,private fireStorage:AngularFireStorage){}

  ngOnInit(){
    console.log("xxxx",this.data);
    this.category=this.data.product.category
    console.log("category",this.category);
    
    this.cservice.getCategorys().subscribe((res)=>{
      this.categories=res
      console.log("categories",this.categories);
      
    })
    const token=sessionStorage.getItem('Token')
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log("hea",this.headers);
  }
  async updateProduct(p:Product){
    
    this.data.product.category=this.category._id
    if (this.file) {
      this.data.product.pic=await this.uploadPic(this.file)
    }
    this.pservice.updateProduct(this.data.product,this.headers).subscribe((res)=>{
      this.data.product.category=this.searchCategory(this.category._id);
      this.matDialogRef.close(this.data.product)
    })
  }
  closePopup(){
    this.matDialogRef.close()
  }

  searchCategory(id:String){
    let selected;
    for (const c of this.categories) {
      if (c._id==id) {
        selected=c;
        break
      }
    }
    return selected;
  }
  onFileChange(event:any){
    this.file=event.target.files[0];
    console.log("dd",this.file);
  }
  async uploadPic(f:File){
    const path=`products/${this.file.name}`
    const upload=await this.fireStorage.upload(path,this.file)
    const url=await upload.ref.getDownloadURL()
    return url;    
  }
}
