import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'
import { CartService } from 'src/app/servers/cart.service'
import { FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.component.html',
  styleUrls: ['./invoicing.component.css']
})
export class InvoicingComponent implements OnInit {
 searchForm:FormGroup
 nameOfProduct
  constructor(
    public r: Router,
    public cs: CartService,
  //  public fb: FormBuilder,

  ) { }
  ngOnInit(): void {
 console.log(this.cs.cartitem)

  }
  
  doownload(){
 let table = document.getElementById('tabl')
html2canvas(table).then((canvas)=>{
  console.log(canvas)
  let imgData = canvas.toDataURL('image/png')
  let doc = new jsPDF()
  doc.addImage(imgData,0,0,200,200)
 doc.save("image.pdf")
})
  }

backToSore(){
  this.r.navigateByUrl('shopping')
}

mark() {
  const item = document.getElementsByClassName("productname")
  for (let i = 0; i < item.length; i++) {
    item[i].innerHTML = item[i].textContent.replace(this.nameOfProduct,`<mark> ${this.nameOfProduct}</mark>`)
  }
}


 } 
