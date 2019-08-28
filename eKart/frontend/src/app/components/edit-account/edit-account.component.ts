import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import {UserLoginService} from '../../user-login.service';
import { MatSnackBar } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import {User} from '../../user.model';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  id:String;
  user:any={};
  updateForm:FormGroup;

  constructor(private userLoginService:UserLoginService, private router:Router,private route:ActivatedRoute,private matSnackBar:MatSnackBar,private fb:FormBuilder,private cookieService:CookieService) {
    this.createForm();
   }

   createForm(){
    this.updateForm=this.fb.group({
      name:['',[Validators.required,Validators.pattern('([a-zA-Z]{1,})')]],
      password:['',[Validators.required,Validators.pattern('[a-z]{1,}[A-Z ]{1,}[0-9]{1,}[\\\.\*\?\^\{\}\|\$]{1,}[a-zA-Z0-9\\\.\*\?\^\{\}\|\$]{0,}')]],
      mobileNumber:[{value:'',disabled:true},Validators.required],
      emailId:[{value:'',disabled:true},Validators.required]
    });
   }
  ngOnInit() {
    let currentUserName = this.cookieService.get('userName');
      this.userLoginService.getAccountDetails(currentUserName).subscribe(user=>{
        this.user=user;
        console.log("username= "+this.user.name);
        console.log("password= "+this.user.password);
        this.updateForm.get('name').setValue(this.user.name);
        this.updateForm.get('password').setValue(this.user.password);
        this.updateForm.get('mobileNumber').setValue(this.user.mobileNumber);
        this.updateForm.get('emailId').setValue(this.user.emailAddress);
      });
  }
  updateAccountDetails(name,password,emailId,mobileNumber){
    console.log("clicked for username: "+name+" and password= "+password);
    let p=this.cookieService.get('userName')+","
    name=p+name;
    this.userLoginService.updateAccountDetails(name,password,emailId,mobileNumber).subscribe(()=>{
      this.cookieService.set('userName',name.toString());
      this.matSnackBar.open('address updated successfully','OK',{
        duration:3000
      });
      this.router.navigateByUrl('/addresses');
    });
  }
}
