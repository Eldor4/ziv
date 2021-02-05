import { Component, OnInit,Inject, inject } from '@angular/core';
import { UsersService } from 'src/app/servers/users.service';
import { ProductsService } from 'src/app/servers/products.service';
import { CartService } from 'src/app/servers/cart.service';
import { Router,ActivatedRoute } from '@angular/router';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public us: UsersService,
    public ys: ProductsService,
    public cs: CartService,
    public ar: ActivatedRoute,
    @Inject( MAT_DIALOG_DATA) public data:any
  ) { }
  
  numOfProduct: number = 1;
  
  
  ngOnInit(): void {
    
  }

  big() {
    this.numOfProduct += 1;
  }
  
  little() {
    this.numOfProduct -= 1;
  }

  bdika(e){

    this.cs.addTocart.cartproductid=this.data.p.productid,
    this.cs.addTocart.Amount=this.numOfProduct,
    this.cs.addTocart.generalprice= this.data.p.price*this.numOfProduct,
    this.cs.addTocart.cart=this.us.loggedUser.cartid,
     console.log(this.cs.addTocart);
     this.cs.toNewProInCart(this.cs.addTocart).subscribe(
      (res: any) => {
        console.log(res)
        this.cs.cartitem = res
      this.sum()
      },      
      err => console.log(err)
      )
  }
 
  sum(){
    this.cs.getcartSum(this.cs.status.cartid).subscribe(
      (res:any)=>{
        this.cs.cartsum=res[0].sum
      },
      err=>{
        console.log(err)
      }
    )
  }
 
}
