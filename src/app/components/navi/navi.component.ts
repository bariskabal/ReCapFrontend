import { Component, OnInit } from '@angular/core';
import { CustomerUser } from 'src/app/models/customer-user';
import { UserInfos } from 'src/app/models/user-infos';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userDetails:UserInfos = new UserInfos();
  customerUser:CustomerUser = new CustomerUser();

  constructor(private authService:AuthService,
              private userService:UserService,
              private customerService:CustomerService,
              private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    let email = this.localStorage.get("email");
    this.getUser(email == null ? email = "" : email.toString());
    this.getCustomerId(email == null ? email = "" : email.toString());
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout()
    window.location.reload();
  }

  getUser(email:string) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.userDetails = response.data;
    })
  }

  getCustomerId(email:string){
      this.customerService.getCustomersByEmail(email == null ? email="" : email).subscribe(
        response => {
          this.customerUser = response.data;
          this.localStorage.set("customerId", this.customerUser.customerId)
        },
        responseError => { console.log("You are not customer yet.") }
      )
  }

}
