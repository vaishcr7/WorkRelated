import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Card} from './card.model';
import { CookieService } from 'ngx-cookie-service';

export class CardServiceService {

  uri='http://localhost:4000';
  constructor(private http:HttpClient,private cookieService:CookieService) { }

  getCards(){
    return this.http.get(this.uri+'/cards');
  }
  getCardById(id){
    let t= this.http.get(this.uri+'/cards/'+id);
    t.subscribe((a:Card)=>{
      console.log(a.cardNumber+" and "+a.expiryDate);
    })
    return t;
  }
  getCardNumber(cardNumber:String){
    console.log("inside service method getCardNumber for cardNumber: "+cardNumber);
    // let m=this.http.get(this.uri+'/');
    let t= this.http.get(this.uri+'/cards/'+cardNumber);
    return t;
  }

  addCard(cardNumber,expiryDate){
    console.log('inside card service for card: '+cardNumber);
    let currentUser = this.cookieService.get('userName');
    const crd={
      cardNumber:cardNumber,
      expiryDate:expiryDate,
      nameOnCard:currentUser
    };
    console.log("sending this from service class: "+crd.cardNumber);
    return this.http.post(this.uri+'/cards/add',crd);
  }
  updateCard(id,cardNumber,expiryDate){
    console.log("inside service method for update card of "+cardNumber);
    const crd={
      cardNumber:cardNumber,
      expiryDate:expiryDate
    };
    return this.http.post(this.uri+'/cards/update/'+id,crd);
  }
  deleteCardById(id){
    return this.http.get(this.uri+'/cards/delete/'+id);
  }
}
