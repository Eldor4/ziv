import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from 'src/app/components/register/register.component'
import {LoginComponent} from 'src/app/components/login/login.component'
import {MainComponent} from 'src/app/components/main/main.component'
import {CartComponent} from 'src/app/components/cart/cart.component'
import {ShoppingpageComponent} from 'src/app/components/shoppingpage/shoppingpage.component'
import {OrderComponent} from 'src/app/components/order/order.component'
import {ErorComponent} from 'src/app/components/eror/eror.component'
//import {CategoryComponent} from 'src/app/components/category/category.component'
 
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}, 
  {path:'',component:MainComponent},
  {path:'shopping',component:ShoppingpageComponent},
 {path:'cart',component:CartComponent},
 {path:'order',component:OrderComponent},
 { path: "**", component:ErorComponent},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
