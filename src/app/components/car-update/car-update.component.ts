import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

 
  carUpdateForm:FormGroup;
  car:Car;
  id:number;

  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.id=params["id"];
        this.createCarUpdateForm(params["id"]);
        this.getCarById(params["id"]);
        
      }
    })
  }

  getCarById(id:number)
  {
    this.carService.getCarById(id).subscribe(response => {
      this.car = response.data[0];
      console.log(response);
    })
  }

  createCarUpdateForm(carId:number){
    this.carUpdateForm = this.formBuilder.group({
      carName:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:[""]
    })
  }


  update(){
    if(this.carUpdateForm.valid){
      let car = Object.assign({},this.carUpdateForm.value);
      car.id=this.id;
      if(typeof(car.id) == "string"){
        car.id = parseInt(car.id);
        car.brandId = parseInt(car.brandId);
        car.colorId = parseInt(car.colorId);
      }
      console.log(car);
      this.carService.update(car).subscribe(response=>{
        this.toastr.success("UPDATE OK")
      },responseError=>{
        if(responseError.error.Errors>0){
          for (let i = 0; i < responseError.error.Errors ; i++) {
            this.toastr.error(responseError.error.Errors[i].ErrorMessage);
          }
        }
      })
    
    }else{
      this.toastr.error("Update Error")
    }
  }

}
