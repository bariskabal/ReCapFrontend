import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = "https://localhost:44313/api/creditcards/"

  constructor(private httpClient:HttpClient) { }

  getCreditCardsByCustomerId(customerId:number):Observable<ListResponseModel<CreditCard>> {
    console.log(customerId)
    return this.httpClient.get<ListResponseModel<CreditCard>>(this.apiUrl + "getbycustomerid?customerId=" + customerId);
  }

  addCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    console.log(creditCard)
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", creditCard)
  }

  deleteCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "delete", creditCard)
  }

}
