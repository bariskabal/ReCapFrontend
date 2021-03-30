import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from 'src/app/models/auth/loginModel';
import { RegisterModel } from 'src/app/models/auth/registerModel';

import { TokenModel } from 'src/app/models/auth/tokenModel';
import { UserPasswordChangingModel } from 'src/app/models/auth/userPasswordChangingModel';
import { ItemResponseModel } from 'src/app/models/itemResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl = "https://localhost:44313/api/auth/";

  constructor(private httpClient:HttpClient,
              private localStorage:LocalStorageService) { }

  register(registerModel:RegisterModel) {
    return this.httpClient.post<ItemResponseModel<TokenModel>>(this.apiUrl + "register", registerModel)
  }

  login(loginModel:LoginModel){
    return this.httpClient.post<ItemResponseModel<TokenModel>>(this.apiUrl + "login", loginModel)
  }

  logout() {
    this.localStorage.remove("token")
    return true;
  }

  isAuthenticated() {
    if(this.localStorage.get("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  updateUserPassword(userPasswordChangingModel:UserPasswordChangingModel) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "changepassword", userPasswordChangingModel)
  }
}
