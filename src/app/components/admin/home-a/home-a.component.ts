import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { Client } from 'src/app/models/client';
import { Command } from 'src/app/models/command';
import { Product } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';
import { CommandService } from 'src/app/services/command.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-a',
  templateUrl: './home-a.component.html',
  styleUrls: ['./home-a.component.css']
})
export class HomeAComponent {
  products!:Product[]
  commands!:Command[]
  clients!:Client[]
  admins!:Admin[]
  headers!: HttpHeaders;

  constructor(private pservice:ProductService,private cservice:CommandService,private clservice:ClientService,private aservice:AdminService){}

  ngOnInit(){

    const token=sessionStorage.getItem('Token')
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });



    this.aservice.getAllAdmins(this.headers).subscribe((res)=>{
      this.admins=res
    })
    this.clservice.getAllClients(this.headers).subscribe((res)=>{
      this.clients=res
    })
    this.pservice.getAllProducts().subscribe((res)=>{
      this.products=res
    })
    this.cservice.getAllCommands(this.headers).subscribe((res)=>{
      this.commands=res
    })
  }
}
