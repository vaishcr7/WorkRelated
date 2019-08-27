import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { CookieService } from 'ngx-cookie-service';

import {RouterModule,Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {ReactiveFormsModule} from '@angular/forms';

import {AddressService} from './address.service';
import {CardServiceService} from './card-service.service';



import {MatToolbarModule,MatFormFieldModule,MatInputModule,MatOptionModule,MatSelectModule,MatIconModule,MatButtonModule,MatCardModule,MatTableModule,MatDividerModule,MatSnackBarModule} from '@angular/material';

import { enableProdMode } from '@angular/core';
import { AddressComponent } from './components/address/address.component';
import { CreateAddressComponent } from './components/create-address/create-address.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { EditCardComponent } from './components/edit-card/edit-card.component';
enableProdMode();

const routes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'addresses',component:AddressComponent},
  {path:'editAddress/:id',component:EditAddressComponent},
  {path:'createAddress',component:CreateAddressComponent},
  {path:'cards',component:CardListComponent},
  {path:'editCard/:id',component:EditCardComponent},
  {path:'createCard',component:CreateCardComponent},
  {path:'',redirectTo:'login',pathMatch:'full'}
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddressComponent,
    CreateAddressComponent,
    EditAddressComponent,
    CardListComponent,
    CreateCardComponent,
    EditCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  providers: [CookieService,AddressService,CardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
