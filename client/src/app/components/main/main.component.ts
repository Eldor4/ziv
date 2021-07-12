import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/servers/products.service';
import { UsersService } from 'src/app/servers/users.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
   public r :Router,
    public ys :ProductsService,
    public us :UsersService,
  ) { }

  ngOnInit(): void {
    this.tocount()
  }

  tocount(){
    this.ys.productcatcount().subscribe(
      (res: any) => {
        this.ys.count=res[0]?.amount
        // console.log(res[0].amount)
        // console.log(this.us?.loggedUser)
      },
      // err => console.log(err)
    )
  }



} 
