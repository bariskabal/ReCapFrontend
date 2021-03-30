import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemResponseModel } from 'src/app/models/itemResponseModel';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental/rental';
import { RentalResponseModel } from 'src/app/models/rental/rentalResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

apiUrl = "https://localhost:44313/api/rentals/"  

constructor(private httpClient:HttpClient) { }



getRentals():Observable<ListResponseModel<Rental>>{
  return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"getrentaldetails");
}
getRentalByCarId(carId: number): Observable<ListResponseModel<Rental>> {
  let newPath = this.apiUrl + 'getrentaldetailbycarid?carId=' + carId;
  return this.httpClient.get<ListResponseModel<Rental>>(newPath);
}
getRental(rentalId:Number):Observable<ItemResponseModel<Rental>> {
  return this.httpClient.get<ItemResponseModel<Rental>>(this.apiUrl + "getbyid?rentalId=" + rentalId);
}
payRental(rental: Rental, amount: number) {
  let newPath = this.apiUrl + 'add';
  return this.httpClient.post<ResponseModel>(newPath,{payment:{amount:amount},rental:{rental}});
}

addRental(rental:Rental){
  let newPath = this.apiUrl + "add"
  this.httpClient.post(newPath,rental).subscribe()
}

}
