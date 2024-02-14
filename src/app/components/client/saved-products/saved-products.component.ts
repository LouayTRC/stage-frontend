import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Favorites } from 'src/app/models/favorites';
import { Product } from 'src/app/models/product';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-saved-products',
  templateUrl: './saved-products.component.html',
  styleUrls: ['./saved-products.component.css']
})
export class SavedProductsComponent {
  products!:Product[]
  playlist!:Favorites
  headers!: HttpHeaders;

  constructor(private fservice:FavoritesService,private active:ActivatedRoute,private pservice:ProductService,private router:Router){}

  ngOnInit(){
    const idPlaylist=this.active.snapshot.params['id'];
    const token=sessionStorage.getItem('Token')
    
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    console.log("id",idPlaylist);
    this.fservice.getPlaylistById(idPlaylist,this.headers).subscribe((res)=>{
      this.playlist=res;
      console.log("plylist",this.playlist);
      this.pservice.listProducts(this.playlist.products).subscribe((res)=>{
        this.products=res;
        console.log("products",this.products);
      })
    })

    
  }

  deleteFromPlaylist(index:number){
    this.fservice.deleteProduct(this.playlist._id,index,this.headers).subscribe((res)=>{
      console.log("res",res);
      if (res.deleted) {
        this.products.splice(index,1);
      }
    })
  }
  checkProduct(p:Product){
    this.router.navigate(["/client/products/"+p._id])
  }
}
