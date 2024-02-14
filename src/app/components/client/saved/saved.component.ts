import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Favorites } from 'src/app/models/favorites';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent {
  playlists!:Favorites[]
  headers!: HttpHeaders;
  constructor(private fservice:FavoritesService){}

  ngOnInit(){
    const token=sessionStorage.getItem('Token')
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    this.fservice.getPlaylists(this.headers).subscribe((res)=>{
      this.playlists=res;
      console.log("playlists",this.playlists);
      
    })
  }
  createPlaylist(name:String){
    this.fservice.createPlaylist({name},this.headers).subscribe((res)=>{
      console.log("res",res);
      this.playlists.push(res)
      
    })
  }
  deletePlaylist(id:String){
    this.fservice.deletePlaylist(id,this.headers).subscribe(()=>{
      console.log("playlist deleted");
      this.playlists=this.playlists.filter(element=>element._id!=id)
    })
  }
}
