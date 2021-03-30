import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/color/color';
import { ItemResponseModel } from 'src/app/models/itemResponseModel';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

apiUrl = "https://localhost:44313/api/colors/"

constructor(private httpClient:HttpClient) { }


getColors():Observable<ListResponseModel<Color>>{
  return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"getall");
}
getColorById(colorId: number): Observable<ItemResponseModel<Color>> {
  return this.httpClient.get<ItemResponseModel<Color>>(this.apiUrl + "getbyid?id="+colorId);
}

addColor(color: Color): Observable<ResponseModel> {
  return this.httpClient.post<ResponseModel>(this.apiUrl + "add", color);
}

update(color:Color):Observable<ItemResponseModel<Color>>{
  return this.httpClient.post<ItemResponseModel<Color>>(this.apiUrl+"update",color);
}
}
