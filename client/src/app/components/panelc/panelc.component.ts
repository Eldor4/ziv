import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/servers/users.service'; 
import { ProductsService } from 'src/app/servers/products.service';
import { CartService } from 'src/app/servers/cart.service'



@Component({
  selector: 'app-panelc',
  templateUrl: './panelc.component.html',
  styleUrls: ['./panelc.component.css']
})
export class PanelcComponent implements OnInit {

  constructor( 
    public us :UsersService,
    public ys:ProductsService,
    public cs:CartService,

  ) { } 

  ngOnInit(): void {
  
  }
}