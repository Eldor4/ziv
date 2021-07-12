import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/servers/products.service';
import { UsersService } from 'src/app/servers/users.service';
import { CartService } from 'src/app/servers/cart.service'


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  constructor(
    public r:Router,
    public ys:ProductsService,
    public cs:CartService,
    public us: UsersService

  ) { }

  ngOnInit(): void {
    this.us.loggedUser.status
  }
  bodekim(f) {
    this.ys.getProductByCategory(f.productcode).subscribe(
      (res: any) => {
        this.ys.allproduct = res
      },
      // err => console.log(err)
    )
  }
  allProduct(){
    this.ys.productall().subscribe(
      (res: any) => {
        this.ys.allproduct = res
      },
      // err => console.log(err)
    )
  }
  logout(){
    this.us.logout()
    this.r.navigateByUrl('')
    this.cs.showCtegory.open=false
  }
}