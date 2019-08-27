  import { Component, OnInit } from '@angular/core';
  import {FormGroup,FormBuilder,Validators,AbstractControl,ValidatorFn} from '@angular/forms';
  import {Router} from '@angular/router';
  import {CardServiceService} from '../../card-service.service';
  import {MatSnackBar} from '@angular/material'

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  cardNumber:String;
  user:any={};
  cardForm:FormGroup;
  myData: any[] = [];

  constructor(private cardService:CardServiceService, private fb:FormBuilder,private router:Router,private matSnackBar:MatSnackBar) { 
    this.cardForm=fb.group({
      cardNumber:['',[Validators.required,Validators.pattern('[0-9]{1,}')]],
      expiryDate:['',[Validators.required,Validators.pattern('^[0-9]{2}[-/]{1}[0-9]{2}[-/]{1}[0-9]{4}$')]]
    });
  }

  checkCardDate(f:FormGroup) {
    let curDate:String = f.get('expiryDate').value;
    // console.log("password is "+pass);
    let validDate = "27-08-2020";
    // console.log("confirm password is "+confirmPass);
    let q=curDate.localeCompare(validDate);
    let flag=( q<=0 ? true : false);
    console.log("till now flag is "+flag);
    return flag;
    // let emailIdToCheck=f.get('emailAddress').value;
    // console.log("emailid to check "+emailIdToCheck);
    // return (flag && this.emailIdAlreadyExists(emailIdToCheck));
  }

  cardAlreadyExists(cardNumber){
    this.cardNumber=cardNumber;
    console.log("sending card number: "+this.cardNumber);
    let t=this.cardService.getCardNumber(this.cardNumber);
    return t;
  }


  addCard(cardNumber,expiryDate){
    console.log("called for "+cardNumber+" , "+expiryDate);
    if(!this.checkCardDate(this.cardForm))
      {
        this.matSnackBar.open('Card has already expired ','OK',{
          duration:3000
        });
        console.log("returning since card is already expired ");
        return;
      }
      let check=this.cardAlreadyExists(cardNumber)
      .subscribe((res:any)=>{
        let str=JSON.stringify(res);
        console.log("got inside card service and card was "+res.card);
        if(res.card=="found"){
          console.log("since cardNumber already exists thus returning false");
          this.matSnackBar.open('Card  is already registered with another user account ','OK',{
            duration:3000
          });
          // this.router.navigateByUrl('/login');
          return;
        }
        else{
          console.log("since card doesn't exists thus returning true");
          // return true;  

          this.cardService.addCard(cardNumber,expiryDate).subscribe(()=>{
            this.router.navigate(['/cards']);
          });
          }
          return res;
        },
        error => {
          console.log("encountered an error here");
        });
  }

  ngOnInit() {
  }

}

