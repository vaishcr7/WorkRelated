import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {UserLoginService} from '../../user-login.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailId:String;
  user:any={};
  loginForm:FormGroup;
  myData: any[] = [];

  constructor(private userLoginService:UserLoginService, private router:Router,private route:ActivatedRoute,private fb:FormBuilder,private matSnackBar:MatSnackBar,private cookieService:CookieService) {
    this.createForm();
   }

   createForm(){
    console.log('inside creating form method');
    this.loginForm=this.fb.group({
      name:['',[Validators.required,Validators.pattern('([a-zA-Z]{1,})')]],
      mobileNumber:['',Validators.required],
      emailAddress:['',[Validators.email,Validators.required]],
      password:['',[Validators.required,Validators.pattern('[a-z]{1,}[A-Z ]{1,}[0-9]{1,}[\\\.\*\?\^\{\}\|\$]{1,}[a-zA-Z0-9\\\.\*\?\^\{\}\|\$]{0,}')]],
      confirmPassword:['',Validators.required]
    }
    // , {validator: this.checkPasswords }
    );
   };

   testValidator(f:FormControl){
     console.log("value is "+f.value());
     let EMAIL_REGEXP = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      return EMAIL_REGEXP.test(f.value) ? null : {
        emailValid: {
            valid: false
        }
    };
   };

   checkPasswords(f:FormGroup) {
    // console.log("inside custom validators");
    // console.log("formgroup is "+f);
    let pass = f.get('password').value;
    // console.log("password is "+pass);
    let confirmPass = f.get('confirmPassword').value;
    // console.log("confirm password is "+confirmPass);
    let flag=( pass === confirmPass ? true : false);
    console.log("till now flag is "+flag);
    return flag;
    // let emailIdToCheck=f.get('emailAddress').value;
    // console.log("emailid to check "+emailIdToCheck);
    // return (flag && this.emailIdAlreadyExists(emailIdToCheck));
  };

  ngOnInit() {
    // console.log("here");
  }  
  emailIdAlreadyExists(emailId){
    this.emailId=emailId;
    console.log("sending emailId: "+this.emailId);
    let t=this.userLoginService.getEmailId(this.emailId);
    // .subscribe((res:any)=>{
    //   let str=JSON.stringify(res);
    //   console.log("got inside user login service for get email id t= "+res.user);
    //   if(res.user=="found"){
    //     console.log("since user already exists thus returning false");
    //     // return false;
    //   }
    //   else{
    //     console.log("since user doesn't exists thus returning true");
    //     // return true;
    //   }
    //   return res;
    // },
    // error => {
    //   console.log("encountered an error here");
    // });
    // console.log("t is "+JSON.stringify(t));
    // console.log("mydata is "+this.myData);
    return t;
    // .subscribe(flag=>{
    //   console.log("flag recieved is "+flag);
    //   return flag;
    // });
  }
  registerAccount(name,mobileNumber,emailAddress,password){
    if(!this.checkPasswords(this.loginForm))
      {
        this.matSnackBar.open('Passwords dont match ','OK',{
          duration:3000
        });
        console.log("returning since passwords dont match");
        return;
      }
      let check=this.emailIdAlreadyExists(emailAddress)
      .subscribe((res:any)=>{
        let str=JSON.stringify(res);
        console.log("got inside user login service for get email id t= "+res.user);
        if(res.user=="found"){
          console.log("since user already exists thus returning false");
          this.matSnackBar.open('Email Id is already registered with another user account ','OK',{
            duration:3000
          });
          // this.router.navigateByUrl('/login');
          return;
        }
        else{
          console.log("since user doesn't exists thus returning true");
          // return true;
        this.userLoginService.registerAcc(name,mobileNumber,emailAddress,password).subscribe(()=>{
          this.cookieService.set( 'userName', name );
          let currentUser = this.cookieService.get('userName');
          console.log(currentUser);
          this.router.navigateByUrl('/addresses');
        });
        }
        return res;
      },
      error => {
        console.log("encountered an error here");
      });
  }

}
