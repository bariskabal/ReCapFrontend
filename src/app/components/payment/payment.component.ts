
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CreditCard } from 'src/app/models/credit-card';
import { Customer } from 'src/app/models/customer/customer';
import { FakeCard } from 'src/app/models/payment/fakeCard';
import { Payment } from 'src/app/models/payment/payment';
import { Rental } from 'src/app/models/rental/rental';
import { CreditCardService } from 'src/app/services/card/credit-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  title = "Payment"
  rental:Rental;
  paymentModel:Payment = new Payment();
  totalPrice:any;

  constructor(private paymentService:PaymentService,
              private creditCardService:CreditCardService,
              private rentalService:RentalService,
              private localStorage:LocalStorageService,
              private toastrService:ToastrService,
              private activatedRoute:ActivatedRoute,
              private router: Router
              
              ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["totalPrice"]){
        this.totalPrice = params["totalPrice"];
      }
    });
  }


  addPayment(form:NgForm) {


    if(this.paymentModel.saveCard == true) {

      let creditCard:CreditCard = new CreditCard();
      creditCard.customerId = this.localStorage.get("customerId") == null ? 0 : Number(this.localStorage.get("customerId"));
      creditCard.nameSurname = this.paymentModel.nameSurname;
      creditCard.cardNo = this.paymentModel.cardNo;
      creditCard.expirationDate = this.paymentModel.expirationDate;
      creditCard.cvc = this.paymentModel.cvc;
      this.creditCardService.addCreditCard(creditCard).subscribe(
        res => { this.toastrService.success("Credit card is saved."); },
        err => { this.toastrService.info("Credit card is already exists"); }
      )

    }

    this.paymentService.addPayment(this.paymentModel).subscribe(
      res => { this.toastrService.success("Payment is successful.");this.router.navigate(["/cars"])},
      err => { this.toastrService.error("Payment error."); }
    )
  }
}
