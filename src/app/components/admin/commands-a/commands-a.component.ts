import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Command } from 'src/app/models/command';
import { CommandService } from 'src/app/services/command.service';

@Component({
  selector: 'app-commands-a',
  templateUrl: './commands-a.component.html',
  styleUrls: ['./commands-a.component.css']
})
export class CommandsAComponent {
  commands!:Command[]
  headers!: HttpHeaders;

  constructor(private cservice:CommandService){}

  ngOnInit(){
    const token=sessionStorage.getItem('Token')
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });


    this.cservice.getAllCommands(this.headers).subscribe((res)=>{
      this.commands=res
      console.log("commands",this.commands);
    })
  }
  acceptCommand(c:Command){
    this.cservice.acceptCommand(c._id,c,this.headers).subscribe((res)=>{
      console.log("accepted",res);
      this.commands=this.commands.map((cmd:Command)=>cmd._id==res._id?res:cmd)
    })
  }
  refuseCommand(c:Command){
    this.cservice.refuseCommand(c._id,c,this.headers).subscribe((res)=>{
      console.log("refused",res);
      console.log("cmmd",this.commands);
      this.commands=this.commands.map((cmd:Command)=>cmd._id==res._id?res:cmd)
    })
  }
}
