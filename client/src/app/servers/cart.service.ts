import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    public http: HttpClient,
    public r: Router,
  ) { }
  //id to delete product
  id = {
    id: 0,
    cart: 0
  }
  //cart to delete cart
  cart = {
    cart: 0
  }
  showCtegory = {
    open: false
  }
  //זמני
  cartsum = {
    sum: 0
  }
  //
  cartitem: []
  baseUrl: string = "/cart/"
  addTocart = {
    cartproductid: 0,
    Amount: 0,
    generalprice: 0,
    cart: 0
  }
  reskabla: []

  openDiv = {
    open: false
  }
  newCart = {
    userid: 0,
    productiondate: new Date,
    status: ''
  }
  status = {
    cartid: 0,
    userid: 0,
    productiondate: '',
    status: ''
  }

  toOrder = {
    userid: 0,
    cart: 0,
    amounttopay: 0,
    orderdate: '',
    fourdigits: 0,
    city: '',
    street: '',
  }

  //רק עגלה פתוחה
  getcart(cartid) {
    return this.http.get(this.baseUrl + cartid, {
      headers: { "Content-Type": "application/json" }
      // "Authorization":localStorage.token}
    })
  }
  //סטטוס עגלה
  getcartstatus(userid) {
    return this.http.get(this.baseUrl + 'b/' + userid, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }
  //Sum 
  getcartSum(cartid) {
    return this.http.get(this.baseUrl + 'sumprice/' + cartid, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }
  //יצירת עגלה חדשה
  newshoppingcart(buddy) {
    return this.http.post(this.baseUrl + 'newshoppingcart', buddy, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }
  //קבלת מוצרים
  getcartitem(cart) {
    return this.http.get(this.baseUrl + 'cart/' + cart, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }
  // שינוי כמות מוצרים??
  putamount(cart, id, amount) {
    return this.http.get(this.baseUrl + 'cart/' + cart + id + amount, {
      headers: { "Content-Type": "application/json" }
      // "Authorization":localStorage.token}
    })
  }
  toNewProInCart(buddy) {
    return this.http.post(this.baseUrl + 'addtocart', buddy, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    }
    )
  }

  changeStatusToOpenn(bb) {
    return this.http.post(this.baseUrl + 'changestatustoopen', bb, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    }
    )
  }
  changeStatusToClosee(dd) {
    return this.http.post(this.baseUrl + 'changestatustoclose', dd, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    }
    )
  }
  upToOrder(body) {
    return this.http.post(this.baseUrl + 'uptoorder', body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    }
    )
  }


  deletepro(id) {
    return this.http.post(this.baseUrl + 'deleteproduct', id, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }
  deletecart(cart) {
    return this.http.post(this.baseUrl + 'deletecart', cart, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }


}
