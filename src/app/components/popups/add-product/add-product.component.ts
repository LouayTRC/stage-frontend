import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm!:FormGroup
  headers!:HttpHeaders
  categories!:Category[]
  file!:File
  constructor(private fb:FormBuilder,private pservice:ProductService,private matDialogRef:MatDialogRef<AddProductComponent>,private cservice:CategoryService,private fireStorage:AngularFireStorage){}
  ngOnInit(){
    this.cservice.getCategorys().subscribe((res)=>{
      console.log("categories",res);
      this.categories=res
    })
    this.productForm=this.fb.group({
      name:['',Validators.required],
      qte:[0,Validators.required],
      description:['',Validators.required],
      pic:['',Validators.required],
      category:['',Validators.required],
      price:[0,Validators.required],
      status:[0,Validators.required],
    })
    console.log("product",this.productForm.value);
    const token=sessionStorage.getItem('Token')
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log("hea",this.headers);
    
  }
  get Name(){
    return this.productForm.controls['name']
  }
  get Description(){
    return this.productForm.controls['description']
  }
  get Qte(){
    return this.productForm.controls['qte']
  }
  get Price(){
    return this.productForm.controls['price']
  }
  async addProduct(){
    if (this.file) {
      this.productForm.value.pic= await this.uploadPic(this.file);
      
    } 
    else {
      this.productForm.value.pic="assets/shop.jpg"
    }
    this.pservice.addProduct(this.productForm.value,this.headers).subscribe((res)=>{
      console.log("aaa",res);
      this.matDialogRef.close(res)
    })
    

   
    
  }
  searchCategory(categories:Category[],id:String){
    let selected;
    for (const c of categories) {
      if (c._id==id) {
        selected=c;
        break
      }
    }
    return selected;
  }
  closePopup(){
    this.matDialogRef.close()
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
