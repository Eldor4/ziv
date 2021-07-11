import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/servers/admin.service'; 
import { UsersService } from 'src/app/servers/users.service'; 
import { ProductsService } from 'src/app/servers/products.service';
import { CartService } from 'src/app/servers/cart.service';
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from 'src/app/components/dialog/dialog.component'
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';



@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.css']
})
export class ProductcardComponent implements OnInit {

searchForm:FormGroup
 addForm:FormGroup 
  constructor(
    public us :UsersService,
    public ys:ProductsService,
    public as:AdminService,
    public cs:CartService,
    public md: MatDialog,
    public ar :ActivatedRoute,
    public fb: FormBuilder, 
    

  ) { }
public bodek=[]
  ngOnInit(): void {
    
this.bodek=this.ys.allproduct
  }
//החזרה מתוך הנגפור ושרת עגלות
openDialog(p){
 let dialogRef= this.md.open(DialogComponent,{data:{p}});
 dialogRef.afterClosed()
 }

//  bodekim(f){
//   this.ys.getProductByCategory(f.productcode).subscribe(
//     (res: any) => {
//       this.ys.allproduct = res
//     },
//     err => console.log(err)
//   )}

  
  sendTOEdit(p){
    this.ys.toAddProductByAdmin.productid=p.productid
    this.ys.toAddProductByAdmin.productname=p.productname
    this.ys.toAddProductByAdmin.categoryid=p.categoryid
    this.ys.toAddProductByAdmin.price=p.price
    this.ys.toAddProductByAdmin.photo=p.photo
    console.log(this.ys.toAddProductByAdmin)
    this.openEdit()
}

//פונקציה לפתיחת פאנל עריכה
opened={
  open:true}
openEdit(){
  this.as.opened.open=this.opened.open,
  console.log( this.as.opened.open)
  

}

}


