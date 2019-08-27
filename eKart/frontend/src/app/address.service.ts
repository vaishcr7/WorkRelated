import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Address} from './address.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  uri='http://localhost:4000';
  constructor(private http:HttpClient,private cookieService:CookieService) { }

  getAddresses(){
    return this.http.get(this.uri+'/addresses');
  }
  getAddressById(id){
    let t= this.http.get(this.uri+'/addresses/'+id);
    t.subscribe((a:Address)=>{
      console.log(a.address+" and "+a.city);
    })
    return t;
  }
  addAddress(address,city,state,pin_code,phoneNumber){
    console.log('inside address service for address: '+address);
    let currentUser = this.cookieService.get('userName');
    const addr={
      address:address,
      city:city,
      state:state,
      pin_code:pin_code,
      phoneNumber:phoneNumber,
      userInfo:currentUser
    };
    console.log("sending this from service class: "+addr.address);
    return this.http.post(this.uri+'/addresses/add',addr);
  }
  updateAddress(id,address,city,state,pin_code,phoneNumber){
    console.log("inside service method for update address of "+address+" and pno= "+phoneNumber);
    const addr={
      address:address,
      city:city,
      state:state,
      pin_code:pin_code,
      phoneNumber:phoneNumber
    };
    return this.http.post(this.uri+'/addresses/update/'+id,addr);
  }
  deleteAddressById(id){
    return this.http.get(this.uri+'/addresses/delete/'+id);
  }
}
