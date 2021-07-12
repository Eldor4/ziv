import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/servers/users.service';
import { CartService } from 'src/app/servers/cart.service'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myform: FormGroup

  User: any

  constructor(
    public r: Router,
    public us: UsersService,
    public fb: FormBuilder,
    public cs: CartService

  ) { }


  ngOnInit(): void {
    this.myform = this.fb.group(
      {
        userName: ['', [Validators.email, Validators.required]],
        password: ['', Validators.required],
      }
    )
  }


  handleSubmit() {

    //console.log(this.myform.value)
    this.us.login(this.myform.value).subscribe(
      (res: any) => {
        localStorage.token = res.token
        this.User = res.user[0]
        this.us.loggedUser.id = res.user[0].id
        this.us.loggedUser.fname = res.user[0].fname
        this.us.loggedUser.role = res.user[0].role
        this.us.loggedUser.city = res.user[0].city
        this.us.loggedUser.street = res.user[0].street
        // this.us.loggedUser.status = res.user[0].status
        this.us.loggedUser.isLogged = true
       
       this.changeStatus()
       
      },
      
      err => alert('One or more of the details you entered are incorrect. Please try again')
      )
    }
    
    toRegister(e) {
      this.r.navigateByUrl('register')
    }
    toShoppingpage(e) {
      this.r.navigateByUrl('shopping')
      
    }
    toNewShoppingpage() {
      this.cs.changeStatusToOpenn({cartid:this.cs.status.cartid}).subscribe(
        (res: any) => {
          this.cs.showCtegory.open==true

          
        },
        // err => console.log(err) 
        ),
       
        this.r.navigateByUrl('shopping')
      }
      //לקבל מהשרת את העגלה האחרונה עם סטטוס/תראיך וכו   
      changeStatus(){
        this.cs.getcartstatus(this.us.loggedUser.id).subscribe(
          (res: any) => {
            const a =res.length-1
            this.cs.status = res[a]
            
            this.sum()
          },
          err => console.log(err) 
          )
        }
sum(){
  this.cs.getcartSum(this.cs.status.cartid).subscribe(
    (res:any)=>{
      this.cs.cartsum=res[0].sum
      
    },
    err=>{
      // console.log(err)
    }
    )
  }
}
