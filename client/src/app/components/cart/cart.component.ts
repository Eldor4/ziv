import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/servers/users.service';
import { ProductsService } from 'src/app/servers/products.service';
import { CartService } from 'src/app/servers/cart.service'
import { ShoppingpageComponent } from 'src/app/components/shoppingpage/shoppingpage.component'
import { Router, ActivatedRoute } from '@angular/router';






@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    public us: UsersService,
    public ys: ProductsService,
    public cs: CartService,
    public shop: ShoppingpageComponent,
    public r: Router,
    public ar: ActivatedRoute,
  ) { }


  x: any
  ngOnInit(): void {
    this.cs.getcart(this.us.loggedUser.id).subscribe(
      (res: any) => {
        this.us.loggedUser.cartid = res[0].cartid;
        this.cs.getcartitem(this.cs.status.cartid).subscribe(
          (res: any) => {
            this.cs.cartitem = res
          }
        )
      },
   //   err => console.log(err),
    )
    this.cs.getcartSum(this.cs.status.cartid).subscribe(
      (res: any) => {
        this.cs.cartsum = res[0].sum
      },
      err => {
   //     console.log(err)
      }
    )

  }
  sum() {
    this.cs.getcartSum(this.cs.status.cartid).subscribe(
      (res: any) => {
        this.cs.cartsum = res[0].sum
      },
      err => {
        console.log(err)
      }
    )
  }
  deletepro(e, it) {
    this.cs.id.id = it.id
    this.cs.id.cart = it.cart
    this.cs.deletepro(this.cs.id).subscribe(
      (res: any) => {
        this.cs.cartitem = res
        this.sum()
      },
     // err => console.log(err)
    )
  }
  deletecart() {
    this.cs.cart.cart = this.us.loggedUser.cartid
    this.cs.deletecart(this.cs.cart).subscribe(
      (res: any) => {
        this.cs.cartitem = res
        this.sum()
      },
      //err => console.log(err)
    )
  }
  goToOrder() {
    this.r.navigateByUrl('order')
    this.cs.showCtegory.open=false
  }

}
