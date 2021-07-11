import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/servers/users.service';
import { ProductsService } from 'src/app/servers/products.service'
import { AdminService } from 'src/app/servers/admin.service'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/servers/cart.service';




@Component({
  selector: 'app-shoppingpage',
  templateUrl: './shoppingpage.component.html',
  styleUrls: ['./shoppingpage.component.css']
})
export class ShoppingpageComponent implements OnInit {

  constructor(
    public r: Router,
    public us: UsersService,
    public as: AdminService,
    public ys: ProductsService,
    public fb: FormBuilder,
    public cs: CartService,
    

  ) { }
  opened = false
  closed = true
  theformAdd: FormGroup
  editForm: FormGroup
  searchForm: FormGroup
  formadd = false



  ngOnInit(): void {
    this.showcategory()
    this.showProduct()
    console.log(this.ys.category)
    this.cs.showCtegory.open=true
    this.theformAdd = this.fb.group({
      productid: ['', Validators.required],
      productname: ['', Validators.required],
      categoryid: ['', Validators.required],
      price: ['', Validators.required],
      photo: ['', Validators.required],
    })
    this.searchForm = this.fb.group(
      { productname: '' }
    )
    this.editForm = this.fb.group({
      productname: ['', Validators.required],
      categoryid: ['', Validators.required],
      price: ['', Validators.required],
      photo: ['', Validators.required],
    })
  }



  showProduct() {
    this.ys.productall().subscribe(
      (res: any) => {
        this.ys.allproduct = res
        console.log(this.ys.allproduct)
      },
      err => console.log(err)
    )
  }
  showcategory() {
    this.ys.tocategory().subscribe(
      (res: any) => {
        this.ys.category = res
      },
      err => console.log(err)
    )
  }

  toformBtn() {
    this.formadd = false
  }
  sendAdd() {
    console.log(this.theformAdd.value)
    this.as.adminAdd(
      this.theformAdd.value).subscribe(
        (res: any) => {
          this.showProduct()
          console.log(res),
            this.formadd = false
        },
        err => console.log(err)
      )
  }

  categoryChange(f) {
    this.ys.getProductByCategory(f.productcode).subscribe(
      (res: any) => {
        this.ys.allproduct = res
      },
      err => console.log(err)
    )
  }

  allProduct(){
    this.ys.productall().subscribe(
      (res: any) => {
        this.ys.allproduct = res
      },
      err => console.log(err)
    )
  }
 
  
  toOrderPage() {
    this.r.navigateByUrl('invoicing')
  }

  search() {

    this.ys.search(this.searchForm.value).subscribe(
      (res: any) => {
        this.ys.allproduct = res
      },
      err => console.log(err)
    )
  }
  sendEdit(event) {
    this.as.moveTo.productid = this.ys.toAddProductByAdmin.productid
    this.as.moveTo.productname = this.editForm.value.productname,
      this.as.moveTo.categoryid = this.editForm.value.categoryid,
      this.as.moveTo.price = this.editForm.value.price,
      this.as.moveTo.photo = this.editForm.value.photo
    this.as.adminEdit(this.as.moveTo).subscribe(
      (res: any) => {
        this.showProduct()
        console.log(res)
        this.as.editPanel.open = false
      },
      err => console.log(err)
    )
  }


}

