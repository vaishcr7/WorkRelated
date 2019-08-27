import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import {AddressService} from '../../address.service';
import { MatSnackBar } from '@angular/material';
import {Address} from '../../address.model';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  id:String;
  address:any={};
  updateForm:FormGroup;

  constructor(private addressService:AddressService, private router:Router,private route:ActivatedRoute,private matSnackBar:MatSnackBar,private fb:FormBuilder) {
    this.createForm();
   }

   createForm(){
    this.updateForm=this.fb.group({
      address:['',Validators.required],
      city:['',[Validators.required,Validators.pattern('([a-zA-Z ]){1,}')]],//([<>0-9~@#$^*(\)_+=[\]{}|\\,.?:-*?!.*"/;`%)')]],
      state:['',Validators.required],
      phoneNumber:['',[Validators.maxLength(10),Validators.minLength(10),Validators.required]],
      pin_code:['',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]]
    });
   }
  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=params.id;
      this.addressService.getAddressById(this.id).subscribe(address=>{
        this.address=address;
        console.log("address= "+this.address.address);
        console.log("city= "+this.address.city);
        this.updateForm.get('address').setValue(this.address.address);
        this.updateForm.get('city').setValue(this.address.city);
        this.updateForm.get('state').setValue(this.address.state);
        this.updateForm.get('pin_code').setValue(this.address.pin_code);
        this.updateForm.get('phoneNumber').setValue(this.address.phoneNumber);
      });
    });
  }
  updateAddress(address,city,state,pin_code,phoneNumber){
    console.log("clicked for phone: "+phoneNumber+" and pincode= "+pin_code);
    this.addressService.updateAddress(this.id,address,city,state,pin_code,phoneNumber).subscribe(()=>{
      this.matSnackBar.open('address updated successfully','OK',{
        duration:3000
      });
      this.router.navigateByUrl('/addresses');
    });
  }
}
