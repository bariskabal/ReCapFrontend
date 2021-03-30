import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car/car';
import { ItemResponseModel } from 'src/app/models/itemResponseModel';

import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

apiUrl = "https://localhost:44313/api/cars/"


constructor(private httpClient:HttpClient) { }


getCars():Observable<ListResponseModel<Car>>{
  let newPath = this.apiUrl + "getcardetails"
  return this.httpClient.get<ListResponseModel<Car>>(newPath);
}
getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
  let newPath = this.apiUrl +"getbybrandid?id="+brandId
  return this.httpClient.get<ListResponseModel<Car>>(newPath);
}
getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
  let newPath = this.apiUrl + "getbycolorid?id="+colorId
  return this.httpClient.get<ListResponseModel<Car>>(newPath);
}
getCarById(carId:number):Observable<ListResponseModel<Car>>{
  let newPath = this.apiUrl + "getbyid?id=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
}
getCarDetails(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
  let newPath = this.apiUrl + "getcardetailbrandandcolorid?brandId=+" + brandId + "&colorId=" + colorId;
  return this.httpClient.get<ListResponseModel<Car>>(newPath); 
}
add(car:Car):Observable<ResponseModel>{
  var response = this.httpClient.post<ResponseModel>(this.apiUrl+"add",car);
  response.subscribe(msg=>{
    console.log(msg.message)
  })
  return response;
}
update(car:Car):Observable<ItemResponseModel<Car>>{
  console.log(car);
  return this.httpClient.post<ItemResponseModel<Car>>(this.apiUrl+"update",car);
}
}
