import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  uri='http://localhost:4000';
  constructor(private http:HttpClient,private cookieService:CookieService) { }

  getEmailId(emailId:String){
    console.log("inside service method getEmailId for emailId: "+emailId);
    // let m=this.http.get(this.uri+'/');
    let t= this.http.get(this.uri+'/users/'+emailId);
    return t;
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
    // const thead = {
    //   next: x =>{
    //     console.log('another user was found' + x);
    //     // return false;
    //     },
    //   error: err => {
    //     console.error('another user was found: ' + err);
    //     // return false;
    //     },
    //   complete: () => {
    //     console.log('Email address is valid');
    //     // return true;
    //     },
    // };
    // return t.subscribe(thead);
    // t.subscribe((a:User)=>{
    //   console.log(a.title+" and "+a.responsible);
    // })
  }

  registerAcc(name,mobileNumber,emailAddress,password){
    console.log('inside user login service for name: '+name);
    const user={
      name:name,
      mobileNumber:mobileNumber,
      emailAddress:emailAddress,
      password:password
    };
    console.log("sending this from service class: "+user.name);
    return this.http.post(this.uri+'/users/add',user);
  }

  getAccountDetails(userName:String){
    console.log("inside service method getAccountDetails for userName: "+userName);
    let t= this.http.get(this.uri+'/users/userName/'+userName);
    // console.log("t inside service method is "+JSON.stringify(t));
    return t;
  }
  updateAccountDetails(userName:String,password:String,emailId:String,mobileNumber:String){
    console.log("inside service method for update user account details of "+userName+" and pno= "+password);
    const user={
      name:userName,
      password:password,
      emailAddress:emailId,
      mobileNumber:mobileNumber
    };
    return this.http.post(this.uri+'/users/update/'+userName,user);
  }

}