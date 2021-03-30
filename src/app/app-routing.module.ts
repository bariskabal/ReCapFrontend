import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserInfosUpdateComponent } from './components/user-infos-update/user-infos-update.component';
import { UserPasswordUpdateComponent } from './components/user-password-update/user-password-update.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/cardetail/:id", component:CarDetailComponent},
  {path:"cars/cars/cardetail/:id", component:CarDetailComponent},
  {path:"cars/brand/:brandId/cars/cardetail/:carId", component:CarComponent},
  {path:"cars/color/:colorId/cars/cardetail/:carId", component:CarComponent},
  {path:"cars/filter/:brandId/:colorId", component:CarComponent},
  {path:"rental/:carId", component:RentalComponent},
  {path:"payment/:rental", component:PaymentComponent},
  {path:"brands/brandadd",component:BrandAddComponent},
  {path:"colors/coloradd",component:ColorAddComponent},
  {path:"cars/caradd",component:CarAddComponent},
  {path:"brands/brandupdate/:brandId",component:BrandUpdateComponent},
  {path:"cars/brand/:id/brands/brandupdate/:brandId",component:BrandUpdateComponent},
  {path:"colors/coloradd",component:ColorAddComponent},
  {path:"colors/colorupdate/:colorId",component:ColorUpdateComponent},
  {path:"cars/color/:id/colors/colorupdate/:colorId",component:ColorUpdateComponent},
  {path:"cars/colors/colorupdate/:colorId",component:ColorUpdateComponent},
  {path:"cars/caradd",component:CarAddComponent},
  {path:"cars/carupdate/:id",component:CarUpdateComponent},
  {path:"cars/cars/carupdate/:id",component:CarUpdateComponent},
  {path:"login",component:LoginComponent},
  {path:"cars/login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"cars/register",component:RegisterComponent},
  {path: "updateinfos", component:UserInfosUpdateComponent},
  {path: "updatepassword", component:UserPasswordUpdateComponent},
  {path: "payment/:totalPrice/:customerId", component: PaymentComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
