import { HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Favorites } from 'src/app/models/favorites';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-save-product',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.css']
})
export class SaveProductComponent {
  playlists!:Favorites[]
  headers!: HttpHeaders;

  constructor(private fservice:FavoritesService,@Inject(MAT_DIALOG_DATA) public data: any,private matDialog:MatDialog){}

  ngOnInit(){
    console.log("data",this.data);
    
    const token=sessionStorage.getItem('Token')
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.fservice.getPlaylists(this.headers).subscribe((res)=>{
      this.playlists=res
      console.log("playlists",this.playlists);
      
    })
  }
  addPlaylist(name:String){
    this.fservice.createPlaylist(name,this.headers).subscribe((res)=>{
      this.playlists.push(res);
    })
  }
  addProduct(playlist:String){
    this.fservice.addProduct(playlist,this.data.product,this.headers).subscribe((res)=>{
      console.log("reeees",res);
      this.matDialog.closeAll()
      
    })
  }
  closePopup(){
    this.matDialog.closeAll()
  }
}
