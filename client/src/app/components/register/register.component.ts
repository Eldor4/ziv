import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/servers/users.service';
import { CartService } from 'src/app/servers/cart.service';
import israeliIdValidator from 'src/app/validators/israelild';
//import { CompareDirective } from 'src/app/validators/apssword';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb :FormBuilder,
    private r :Router,
    private us :UsersService,
    private cs :CartService,
    
    ) { }
    
    citys =[
      {id: 1,value:"Jerusalem"},
      {id: 2,value:"TLV"},
      {id: 3,value: "Haifa"},
      {id: 4,value:"Rishon Lezion"},
      {id: 5,value:"Petah Tikva"},
      {id: 6,value:"Ashdod"},
      {id: 7,value:"Netanya"},
      {id: 8,value:"Beer Sheva"},
      {id: 9,value:"Bnei Brak"},
      {id: 10,value:"Holon"}
    ];
    myForm:FormGroup
    onestep:FormGroup
    twotep:FormGroup
  
    ngOnInit(): void {
      this.myForm= this.fb.group(
        { 
          id:["",[Validators.required, israeliIdValidator]],
          fname: ['', Validators.required],
          lmame: ['', Validators.required],
          userName: ['',[ Validators.email,Validators.required]],
          password: ['', Validators.required],
          confirmPassword: ['',Validators.required],  
          city: ['',Validators.required],
          street: ['', Validators.required], 
        }
        )
      }
      passmsg: string;
      checkPassSame() {
        let password = this.myForm.value.password;
        let confirmPassword = this.myForm.value.confirmPassword;
        if(password == confirmPassword) { 
          this.passmsg = "";
          return false; 
        }else { 
          this.passmsg = "Password did not match.";
          return true;
        }
      }
  
  
  

          
      
      
      handleSubmit(e){
    console.log(this.myForm.value)
    this.us.register(this.myForm.value).subscribe(
      res=>{console.log(res)
      this.newcart(),
      this.r.navigateByUrl('')},
      err=>{alert(err),
      this.r.navigateByUrl('')}
      )
    }
    spanId: string;
    checkId(evevn){
      //console.log(this.myForm.value.id);
      this.us.toCheckId(this.myForm.value.id).subscribe( res => {
       console.log(res)
       if(res=='notgood'){
         // alert('This ID already exists. You can login with a password'),
         this.spanId ='This ID already exists. You can login with a password',
         this.myForm.value.id= '',
         this.myForm.reset()
        }else if(res=='good'){
          this.spanId=''
        }
        console.log(this.spanId)
    },
      error => console.log(error)
    
    )
      }

      newcart(){
        this.cs.newCart.userid=this.myForm.value.id
        this.cs.newshoppingcart(this.cs.newCart).subscribe(
          (res: any) => {
            
            },
            err => console.log(err) 
        )
      }
      
 }

// fname, lname, username, password  ,city, street