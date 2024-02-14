import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CommandService } from 'src/app/services/command.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  panier!:any[]
  headers!:HttpHeaders
  products!:Product[];
  total:Number=0;
  constructor(private cservice:CommandService,private pservice:ProductService,private router:Router){}

  ngOnInit(){
    this.panier=JSON.parse(sessionStorage.getItem("panier") || "[]");

    this.pservice.listProducts(this.panier).subscribe((res)=>{
      this.products=res
      this.total=this.calculTotal()
      console.log("products",this.products);
      
    })
    const token=sessionStorage.getItem('Token')
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });



  }
  validerCommande(){
    console.log("aaa0",this.panier);
    
    if (this.panier.length!=0) {
      this.cservice.addCommand(this.panier,this.headers).subscribe((res)=>{
        console.log("res",res);
        sessionStorage.removeItem("panier")
        this.router.navigate(['/client/commands']);
      })
    }
    
  }
  updateQte(p:Product){
    this.panier=JSON.parse(sessionStorage.getItem("panier") || "[]");

    for (const element of this.panier) {
     
      if(element.idProduct == p._id){
        element.qte=p.qte;
        console.log("eleemenet",element);
        break;
      }
    }
    sessionStorage.setItem("panier",JSON.stringify(this.panier));
    this.total=this.calculTotal()
  }
  calculTotal(){
    let total=0;
    for (const element of this.products) {
      total+=element.price*element.qte;
    }
    return total
  }
  deleteFromChart(index:number){
    this.panier=JSON.parse(sessionStorage.getItem("panier") || "[]");
    this.panier.splice(index,1);
    sessionStorage.setItem("panier",JSON.stringify(this.panier));
    this.products.splice(index,1)
  }
}
