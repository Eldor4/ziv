import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/servers/users.service';
import { CartService } from 'src/app/servers/cart.service';
import { ProductsService } from 'src/app/servers/products.service';
import { jsPDF } from 'jspdf';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup
  cart = {
    acrt: this.us.loggedUser.cartid
  }
  or: []
  orderCartItem =
    [{
      productname: '',
      price: 0,
      Amount: 0,
      generalprice: 0,
      cart: 0

    }]
  htmlProducts

  sum: any
  citys = [
    { id: 1, value: "Jerusalem" },
    { id: 2, value: "tlv" },
    { id: 3, value: "Haifa" },
    { id: 4, value: "Rishon Lezion" },
    { id: 5, value: "Petah Tikva" },
    { id: 6, value: "Ashdod" },
    { id: 7, value: "Netanya" },
    { id: 8, value: "Beer Sheva" },
    { id: 9, value: "Bnei Brak" },
    { id: 10, value: "Holon" }
  ];
  constructor(
    public fb: FormBuilder,
    public us: UsersService,
    public cs: CartService,
    public ps: ProductsService,
    public r: Router,
  ) { }



  ngOnInit(): void {
    this.cs.getcartitem(this.cs.status.cartid).subscribe(
      (res: any) => {
        this.orderCartItem = res,

          this.htmlProducts = this.orderCartItem.map(item => {
            return (
              `<tr>
          <td>
              ${item.productname}
          </td>
          <td>
          ${item.price}
          </td>
          <td>
          ${item.Amount}
          </td>
          <td>
          ${item.generalprice}
          </td>
       </tr> 
      `
            )
          })
      }

    )
    this.cs.getcartSum(this.cs.status.cartid).subscribe(
      (res: any) => {
        this.sum = res[0].sum
      },
      err => {
        // console.log(err)
      }
    )

    this.orderForm = this.fb.group(
      {

        city: ['', Validators.required],
        street: ['', Validators.required],
        orderdate: ['', Validators.required],
        fourdigits: ['', Validators.required && Validators.minLength(4)],

      }
    )
    this.ps.countdate().subscribe(
      (res: any) => {
        // console.log(res)
        this.ps.counterOfDate = res.map(e => new Date(e.orderdate).getTime())
        this.or = this.ps.counterOfDate
        // console.log(this.or)
      },
      err => {
        // console.log(err)
      }
    )
    // counterOfDate={
    //   counter:0,
    //   orderdate: ''
    // }
  }
  onDabelClickCity() {
    this.orderForm.controls.city.setValue(this.us.loggedUser.city)
  }
  onDabelClickStreet() {
    this.orderForm.controls.street.setValue(this.us.loggedUser.street)
  }
  tos: any
  datetToSql() {
    let date = this.orderForm.value.orderdate
    let dd = date.getDate()
    let yyyy = date.getFullYear()
    let mm = date.getMonth() + 1
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    this.tos = (yyyy + '-' + mm + '-' + dd)
  }

  upToOrder() {
    this.datetToSql()
    this.cs.changeStatusToClosee({ cartid: this.cart.acrt }).subscribe(
      (res: any) => {
        console.log(res)
      },
      // err => { console.log(err) }
    )

    this.cs.deletecart({ cart: this.cart.acrt }).subscribe(
      (res: any) => {
        // console.log(res)
      },
      // err => { console.log(err) }
    )
    this.cs.toOrder.userid = this.us.loggedUser.id
    this.cs.toOrder.cart = this.cart.acrt
    this.cs.toOrder.amounttopay = this.sum
    this.cs.toOrder.orderdate = this.tos
    this.cs.toOrder.fourdigits = this.orderForm.value.fourdigits
    this.cs.toOrder.city = this.orderForm.value.city
    this.cs.toOrder.street = this.orderForm.value.street
    
    this.cs.upToOrder(this.cs.toOrder).subscribe(
      (res: any) => {
        console.log(res)
      },
      err => console.log(err)
    )
    this.us.logout()

  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    const time = (d || new Date()).getTime()
    return day !== 5 && day !== 6 && d > new Date()&&
     !this.ps?.counterOfDate.find(x => {
      return x == time
    })
  }
  
  //id, cartproductid, Amount, generalprice, cart
backToOrder(){
  this.cs.openDiv.open=false
}
  downloadPDF(){
    this.cs.openDiv.open=true
    // console.log(this.cs.openDiv.open)
  }

  backToSore(){
    this.r.navigateByUrl('shopping')
  }
  
}
