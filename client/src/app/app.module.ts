import { BrowserModule } from '@angular/platform-browser';
import { NgModule,OnChanges } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select'; 
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatStepperModule} from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';






import { AppRoutingModule } from './app-routing.module';  
import { AppComponent } from './app.component';  
import { RegisterComponent } from './components/register/register.component';  
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadComponent } from './components/head/head.component'; 
import { PanelbComponent } from './components/panelb/panelb.component';
import { PanelcComponent } from './components/panelc/panelc.component'; 
import { ShoppingpageComponent } from './components/shoppingpage/shoppingpage.component';
import { ProductcardComponent } from './components/productcard/productcard.component';
import { CartComponent } from './components/cart/cart.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { InvoicingComponent } from './components/invoicing/invoicing.component';
import {MatTableModule} from '@angular/material/table';
import { OrderComponent } from './components/order/order.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ErorComponent } from './components/eror/eror.component';
//import { CategoryComponent } from './components/category/category.component';



@NgModule({
  declarations: [   
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MainComponent,   
    HeadComponent, PanelbComponent, PanelcComponent, ShoppingpageComponent, ProductcardComponent, 
    CartComponent, DialogComponent,  InvoicingComponent, OrderComponent, ErorComponent, 
      
  ],
  entryComponents:[DialogComponent],
  imports: [ 
    FormsModule,
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,  
    MatIconModule,
    MatButtonModule, 
    MatMenuModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,  
    MatCardModule, 
    ScrollingModule,  
    MatStepperModule,  
    MatAutocompleteModule,
    MatSidenavModule, 
    MatRadioModule,
    MatDialogModule,
    MatTableModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,

     
  ],   
  providers: [],
  bootstrap: [AppComponent]
  
})  
export class AppModule { }
