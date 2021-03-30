import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/credit-card';
import { Payment } from 'src/app/models/payment/payment';
import { Rental } from 'src/app/models/rental/rental';
import { CreditCardService } from 'src/app/services/card/credit-card.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  creditCards:CreditCard[];
  rentalId:number;

  constructor(private creditCardService:CreditCardService,
              private paymentService:PaymentService,
              private activatedRoute:ActivatedRoute,
              private toastrService:ToastrService,
              private rentalService:RentalService,
              private router:Router
              ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["customerId"]){
        this.getCreditCardsByCustomerId(params["customerId"]);
      }
    });
  }

  getCreditCardsByCustomerId(customerId:number) {
    this.creditCardService.getCreditCardsByCustomerId(customerId).subscribe((response) => {
      this.creditCards = response.data;
      console.log(response.data)
    })
  }

  deleteCreditCard(creditCard:CreditCard) {
    this.creditCardService.deleteCreditCard(creditCard).subscribe((response) => {
      this.toastrService.error("The credit card is deleted.");
      setTimeout(() => { window.location.reload(); }, 1500);
    })
  }

  paymentWithThisCreditCard(creditCard:CreditCard) {

    let payment:Payment = new Payment();
    payment.cardNo = creditCard.cardNo;
    payment.nameSurname = creditCard.nameSurname;
    payment.expirationDate = creditCard.expirationDate;
    payment.cvc = creditCard.cvc;
    this.paymentService.addPayment(payment).subscribe(
      res => { this.toastrService.success("Payment is successful.");this.router.navigate(["/cars"]) },
      err => { console.log(err.error); this.toastrService.error(err.error); }
    )
  }


}
