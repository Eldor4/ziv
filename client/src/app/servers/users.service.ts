import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = "/users"
  loginuserUrl: string = "/test"

  loggedUser = {
    id: 0,
    cartid: 0,
    fname: '',
    isLogged: false,
    role: 'guest',
    status: '',
    city: '',
    street: '',
  }

  isPassOk = {
    ok: ''
  }
  // customerCartStatus: "",
  // last_day: "",
  // open_cart: false,

  constructor(
    private http: HttpClient,
    private r: Router

  ) { }


  logout() {
    localStorage.removeItem("token")
    this.loggedUser = {
      id: 0,
      cartid: 0,
      fname: '',
      isLogged: false,
      role: 'guest',
      status: '',
      city: '',
      street: '',
    }
    this.r.navigateByUrl('')
  }

  register(buddy) {
    return this.http.post(this.baseUrl + '/register', buddy, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
  login(buddy) {
    return this.http.post(this.baseUrl + '/login', buddy, {
      headers: { "Content-Type": "application/json" }
    })
  }
  userid
  toCheckId(toid) {
    return this.http.get(this.baseUrl + '/idregistertest/' + toid)
  }
  // id=localStorage.token.id
  // userLogin(id){
  //   console.log(id)
  //     return this.http.get(this.loginuserUrl+ id,  {
  //     headers: { "Content-Type": "application/json",
  //     "Authorization":  sessionStorage.token}
  //   }
  //     )
  // }
  // let res = await fetch("http://localhost:1501/vacation/add", {
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": localStorage.token
  //   }






}
