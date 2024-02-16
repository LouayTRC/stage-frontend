import { HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent {
  client!:Client
  passwordForm!:FormGroup
  headers!: HttpHeaders;
  constructor(private fb:FormBuilder,private cservice:ClientService,private matDialog:MatDialog){}

  ngOnInit(){

    this.passwordForm=this.fb.group({
      old:['',Validators.required,],
      new:['',Validators.required,],
      new1:['',Validators.required,]
    })

    const token=sessionStorage.getItem('Token')
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  changePassword(){
    this.cservice.changePassword(this.passwordForm.value,this.headers).subscribe((res)=>{
      console.log("res");
      this.matDialog.closeAll()
    })
  }
  closePopup(){
    this.matDialog.closeAll()
  }
}
