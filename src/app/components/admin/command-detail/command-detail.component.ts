import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Command } from 'src/app/models/command';
import { CommandService } from 'src/app/services/command.service';

@Component({
  selector: 'app-command-detail',
  templateUrl: './command-detail.component.html',
  styleUrls: ['./command-detail.component.css']
})
export class CommandDetailComponent {
  command!:Command
  headers!: HttpHeaders;

  constructor(private cservice:CommandService,private active:ActivatedRoute){}

  ngOnInit(){
    const token=sessionStorage.getItem('Token')
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const idCmmd=this.active.snapshot.params['id'];
    console.log("id",idCmmd);
    
    this.cservice.getCommandById(idCmmd,this.headers).subscribe((res)=>{
      this.command=res
      console.log("cmmd",this.command);
      
    })
  }
}
