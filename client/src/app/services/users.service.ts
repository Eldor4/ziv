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

  constructor(
    private http: HttpClient,
    private r: Router

  ) { }

  //Register
  register(buddy) {
    return this.http.post(this.baseUrl + '/register', buddy, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
  //Login
  login(buddy) {
    return this.http.post(this.baseUrl + '/login', buddy, {
      headers: { "Content-Type": "application/json" }
    })
  }

  userid
  toCheckId(toid) {
    return this.http.get(this.baseUrl + '/tt/' + toid)
  }

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

  // id=localStorage.token.id
  userLogin(id) {
    // console.log(id)
    return this.http.get(this.loginuserUrl + id, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": sessionStorage.token
      }
    }
    )
  }
}
