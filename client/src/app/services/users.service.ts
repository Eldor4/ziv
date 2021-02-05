import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = "/users"
  loginuserUrl: string = "/test"

  constructor(
    private http: HttpClient,
    private r: Router

  ) { }

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
    return this.http.get(this.baseUrl + '/tt/' + toid)
  }
  // id=localStorage.token.id
  userLogin(id) {
    console.log(id)
    return this.http.get(this.loginuserUrl + id, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": sessionStorage.token
      }
    }
    )
  }
  // let res = await fetch("http://localhost:1501/vacation/add", {
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": localStorage.token
  //   }






}
