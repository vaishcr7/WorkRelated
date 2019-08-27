import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {UserLoginService} from '../../user-login.service';
import { MatSnackBar } from '@angular/material';
import {AddressService} from '../../address.service';
import {MatTableDataSource} from '@angular/material';
import {Address} from '../../address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addresses = new MatTableDataSource<Address>();
  displayedColumns:ReadonlyArray<String> = ['address','city','state','pin_code' ,'phoneNumber','userInfo','actions'];
  constructor(private addressService:AddressService,private router:Router) { }

  ngOnInit() {
    this.fetchAddresses();
  }
  fetchAddresses(){
    // console.log("being called for current issues: "+this.issues);
    this.addressService.getAddresses().subscribe((data:Address[])=>{
      this.addresses.data=data;
      console.log("incoming data: "+this.addresses.data);
      // this.issues=new Array(data.length);
      // for(let i=0;i<data.length;i++)
      //   {
      //     this.issues[i]=data[i];
      //     console.log('issues are '+this.issues[i].title+" , ");
      //   }
    });
  }
  editAddress(id){
    this.router.navigate(['/editAddress/'+id]);
  }
  deleteAddress(id){
    this.addressService.deleteAddressById(id).subscribe(()=>{
      this.fetchAddresses();
    });
  }
  gotoCardsSection(){
    this.router.navigateByUrl('/cards');
  }
}
