import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    public http: HttpClient,
    public r: Router
  ) { }
  baseUrl: string = "/product/"

  count = {
    count: 0
  }
  allproduct: [{
    productid: 0,
    productname: '',
    categoryid: 0,
    price: 0,
    photo: 0
  }]
  onepro: any
  category
    = [{
      productcode: 0,
      categoryname: ''
    }]
  productbycat: []

  //   prod {
  // producid: 1,
  // photo: "",
  // price: 0,
  // productid: 0,
  // productname: "",}

  toAddProductByAdmin = {
    productid: 0,
    productname: '',
    categoryid: 0,
    price: 0,
    photo: ''
  }
  counterOfDate: []
  productcatcount() {
    return this.http.get(this.baseUrl + 'productcatcount', {
      headers: { "Content-Type": "application/json" }
    })
  }


  productall() {
    return this.http.get(this.baseUrl + 'allproducts', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }
  tocategory() {
    return this.http.get(this.baseUrl + 'allcategory', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }
  getProductByCategory(productid) {
    return this.http.get(this.baseUrl + 'tocat/' + productid, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }
  search(productname) {
    return this.http.post(this.baseUrl + 'search/', productname, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }

  countdate() {
    return this.http.get(this.baseUrl + 'countdate', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }


}




