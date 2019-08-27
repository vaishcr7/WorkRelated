import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators,AbstractControl,ValidatorFn} from '@angular/forms';
import {Router} from '@angular/router';
import {AddressService} from '../../address.service';


@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css']
})
export class CreateAddressComponent implements OnInit {

  createForm:FormGroup;
  constructor(private addressService:AddressService, private fb:FormBuilder,private router:Router) { 
    this.createForm=fb.group({
      address:['',Validators.required],
      city:['',[Validators.required,Validators.pattern('([a-zA-Z ]){1,}')]],//([<>0-9~@#$^*(\)_+=[\]{}|\\,.?:-*?!.*"/;`%)')]],
      state:['',[Validators.required,this.stateCheck]],
      phoneNumber:['',[Validators.maxLength(10),Validators.minLength(10),Validators.required]],
      pin_code:['',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]]
    });
  }

  stateCheck(input: string, stateList: any[]): ValidatorFn {
    return (control: AbstractControl):  { [state: string]: any } =>{
    let states:string[]; 
    states = ["up","haryana","chattisgarh","bihar","maharashtra",
      "karnataka","kerela","tamil nadu","telangana","andhra pradesh","goa","gujarat","punjab",
      "jharkhand","uttarkhand","delhi","assam","madhya pradesh","manipur","arunachal pradesh","mizoram","west bengal","orissa",
      "nagaland" ]
    stateList=states;
    for(let h=0;h<stateList.length;h++){
      if(input==stateList[h])
        {
          console.log("found a match");
          return true ? null : { 'stateCheck': false };
        }
    }
    console.log("didn't find a match");   
    return false ? null : { 'stateCheck': false };
    }
  }

  addAddress(address,city,state,pin_code,phoneNumber){
    console.log("called for "+address+" , "+city);
    this.addressService.addAddress(address,city,state,pin_code,phoneNumber).subscribe(()=>{
      this.router.navigate(['/addresses']);
    });
  }

  ngOnInit() {
  }

}
