import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {UserLoginService} from '../../user-login.service';
import { MatSnackBar } from '@angular/material';
import {CardServiceService} from '../../card-service.service';
import {MatTableDataSource} from '@angular/material';
import {Card} from '../../card.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  cards = new MatTableDataSource<Card>();
  displayedColumns:ReadonlyArray<String> = ['cardNumber','expiryDate','nameOnCard','actions'];
  constructor(private cardService:CardServiceService,private router:Router) { }

  ngOnInit() {
    this.fetchCards();
  }
  fetchCards(){
    // console.log("being called for current issues: "+this.issues);
    this.cardService.getCards().subscribe((data:Card[])=>{
      this.cards.data=data;
      console.log("incoming data: "+this.cards.data);
      // this.issues=new Array(data.length);
      // for(let i=0;i<data.length;i++)
      //   {
      //     this.issues[i]=data[i];
      //     console.log('issues are '+this.issues[i].title+" , ");
      //   }
    });
  }
  editCard(id){
    this.router.navigate(['/editAddress/'+id]);
  }
  deleteCard(id){
    this.cardService.deleteCardById(id).subscribe(()=>{
      this.fetchCards();
    });
  }
  gotoAddressesSection(){
    this.router.navigateByUrl('/addresses');
  }
}
