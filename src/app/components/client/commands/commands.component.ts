import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Command } from 'src/app/models/command';
import { Product } from 'src/app/models/product';
import { CommandService } from 'src/app/services/command.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent {
  headers!: HttpHeaders;
  commands!:Command[]
  products!:Product[]
  constructor(private cservice:CommandService,private pservice:ProductService){}
  ngOnInit(){
    const token=sessionStorage.getItem('Token')
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.pservice.getAllProducts().subscribe((res)=>{
      this.products=res
      this.cservice.getCommandsByClient(this.headers).subscribe((res)=>{
        this.commands=res
        
        console.log("cmmds",this.commands);
      })
    })
    
  }

}
