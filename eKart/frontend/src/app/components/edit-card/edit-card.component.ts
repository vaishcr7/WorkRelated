  import { Component, OnInit } from '@angular/core';
  import {FormGroup,FormBuilder,Validators} from '@angular/forms';
  import {Router,ActivatedRoute} from '@angular/router';
  import {CardServiceService} from '../../card-service.service';
  import { MatSnackBar } from '@angular/material';
  import {Card} from '../../card.model';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {

  id:String;
  card:any={};
  updateForm:FormGroup;

  constructor(private cardService:CardServiceService, private router:Router,private route:ActivatedRoute,private matSnackBar:MatSnackBar,private fb:FormBuilder) {
    this.createForm();
   }

   createForm(){
    this.updateForm=this.fb.group({
      cardNumber:['',Validators.required],
      expiryDate:['',Validators.required]
    });
   }
  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=params.id;
      this.cardService.getCardById(this.id).subscribe(card=>{
        this.card=card;
        console.log("number= "+this.card.cardNumber);
        console.log("exp date= "+this.card.expiryDate);
        this.updateForm.get('cardNumber').setValue(this.card.cardNumber);
        this.updateForm.get('expiryDate').setValue(this.card.expiryDate);
      });
    });
  }
  updateCard(cardNumber,expiryDate){
    console.log("clicked for number: "+cardNumber+" and exp date= "+expiryDate);
    this.cardService.updateCard(this.id,cardNumber,expiryDate).subscribe(()=>{
      this.matSnackBar.open('card updated successfully','OK',{
        duration:3000
      });
      this.router.navigateByUrl('/cards');
    });
  }
}
