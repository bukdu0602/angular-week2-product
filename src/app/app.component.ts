import { Component } from '@angular/core';

export class productInfo {
  item!: string;
  qty!: number;
  price!: number;
  amount!: number;
  id!: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'homework2';
  fName = ""
  lName = ""
  address = ""
  fNameValidation = "none"
  submitAddressPressed = false
  addButtonClicked = false

  products = [{'item':'Peaches', 'price':1.39}, 
  {'item':'Pears', 'price':1.99},
  {'item':'Apples', 'price':1.23}];
  productSelection!: number
  quantity!: number
  subTotal: number = 0
  productArray: Array<productInfo> = [];
  tax: number = 0
  total: number = 0

  onSubmit() {
    this.submitAddressPressed = true
  }
 
  addButtonPressed() {
    this.addButtonClicked = true
    if (this.quantity && this.productSelection){
        let newItem = new productInfo()
        newItem.item = this.products[this.productSelection].item
        newItem.qty = this.quantity
        newItem.price = this.products[this.productSelection].price
        newItem.amount = this.quantity * this.products[this.productSelection].price
        newItem.id = this.productArray.length + 1
        this.productArray.push(newItem)
        this.calculateTotal()
    }
  }
  calculateTotal() {
    this.subTotal = 0
    for (let i = 0; i < this.productArray.length; i++) {
      this.subTotal += (this.productArray[i].price * this.productArray[i].qty)
      this.subTotal = +(Math.round((this.subTotal) * 100) / 100).toFixed(2);
    }
    this.tax =  +(Math.round((this.subTotal * 0.07) * 100) / 100).toFixed(2);
    this.total =  +(Math.round((this.subTotal + this.tax) * 100) / 100).toFixed(2);
  }

  removeItem(id: number){
    for(var i=0; i<this.productArray.length; i++) {
      if(this.productArray[i].id == id) {
        this.productArray.splice(i,1); // remove 1 item at ith place
      }
    }
    this.calculateTotal()

  }
}
