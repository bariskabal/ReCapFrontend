import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Brand } from 'src/app/models/brand/brand';
import { ResponseModel } from 'src/app/models/responseModel';
import { ItemResponseModel } from 'src/app/models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44313/api/brands/"
  
  constructor(private httpClient:HttpClient) { }


  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"getall");
  }
  getBrandById(brandId: number): Observable<ItemResponseModel<Brand>>{
    return this.httpClient.get<ItemResponseModel<Brand>>(this.apiUrl + "getbyid?id=" + brandId);
  }

  addBrand(brand: Brand) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", brand);
  }

  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update",brand);
  }

}
