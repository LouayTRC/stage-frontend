import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupUser!:FormGroup
  file!: File;

  constructor(private fb:FormBuilder,private auth:AuthenticationService,private matDialog:MatDialog,private fireStorage:AngularFireStorage){}
  
  ngOnInit(){
    this.signupUser=this.fb.group({
      fullname:['',Validators.required],
      username:['',Validators.required],
      mail:['',Validators.required],
      password:['',Validators.required],
      pic:[''],
      birthday:['',Validators.required],
      adress:['',Validators.required],
      phone:['',Validators.required]
    })
  }
  get Fullname(){
    return this.signupUser.controls['fullname'];
  }
  get Username(){
    return this.signupUser.controls['username'];
  }
  get Mail(){
    return this.signupUser.controls['mail'];
  }
  get Password(){
    return this.signupUser.controls['password'];
  }
  get Birthday(){
    return this.signupUser.controls['birthday'];
  }
  get Adress(){
    return this.signupUser.controls['adress'];
  }
  get Phone(){
    return this.signupUser.controls['phone'];
  }

  async signup(){
    if (this.file) {
      this.signupUser.value.pdp=await this.uploadPic(this.file);
    } else {
      this.signupUser.value.pdp="assets/nouveau.png"
    }
    console.log("signup",this.signupUser.value);
    this.auth.signup(this.signupUser.value).subscribe((res)=>{
      console.log("res",res);
      this.closePopup()
    })
  }
  closePopup(){
    this.matDialog.closeAll()
  }
  onFileChange(event:any){
    this.file=event.target.files[0];
    console.log("dd",this.file);
  }
  async uploadPic(f:File){
    const path=`users/${this.file.name}`
    const upload=await this.fireStorage.upload(path,this.file)
    const url=await upload.ref.getDownloadURL()
    return url;    
  }
}
