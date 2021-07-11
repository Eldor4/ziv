import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  //פתיחת פאנל עריכה מוגדר סגור כברירת מחדל
  opened = {
    open: false
  }
  moveTo = {
    productid: 0,
    productname: '',
    categoryid: 0,
    price: 0,
    photo: ''
  }
  constructor(
    public http: HttpClient,
    public r: Router,
  ) { }

  baseUrl: string = "/adminarea/"


  //הוספת מוצר חדש
  adminAdd(buddy) {
    return this.http.post(this.baseUrl + 'add', buddy, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }
  adminEdit(buddy) {
    return this.http.post(this.baseUrl + 'edit', buddy, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }
}
