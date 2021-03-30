import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerUser } from 'src/app/models/customer-user';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerResponseModel } from 'src/app/models/customer/customerResponseModel';
import { ItemResponseModel } from 'src/app/models/itemResponseModel';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

apiUrl = "https://localhost:44313/api/customers/"

constructor(private httpClient:HttpClient) { }

getCustomers():Observable<ListResponseModel<Customer>>{
  return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl+"getcustomerdetails");
}
getCustomerById(customerId: number): Observable<ListResponseModel<Customer>> {
  let newPath = this.apiUrl + 'getcustomerdetailbycustomerid?customerId=' + customerId;
  return this.httpClient.get<ListResponseModel<Customer>>(newPath);
}
getCustomersByEmail(email:string):Observable<ItemResponseModel<CustomerUser>> {
  return this.httpClient.get<ItemResponseModel<CustomerUser>>(this.apiUrl + "getbyemail?email=" + email);
}
}
