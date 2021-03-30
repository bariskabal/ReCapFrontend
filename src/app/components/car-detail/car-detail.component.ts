import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/car/car-detail';
import { CarImage } from 'src/app/models/carImage/carImage';
import { Rental } from 'src/app/models/rental/rental';
import { CarImageService } from 'src/app/services/car-image/car-image.service';
import { CarService } from 'src/app/services/car/car.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {




  carImages: CarImage[] = [];
  cars: Car;
  dataLoaded = false;
  apiUrl : string = "https://localhost:44313/img/";
  
  constructor(private carService: CarService,
    private carImageService:CarImageService,
    private activatedRoute: ActivatedRoute,
    private localStorage:LocalStorageService,
    private toastrService:ToastrService,
    private rentalService:RentalService,
    private router:Router
    //private config:NgbCarouselConfig
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"]) {
        this.getCarDetailsByCarId(params["id"]);
        this.getCarImagesByCarId(params["id"]);
      } 
    })
  }

  getCarDetailsByCarId(carId:number){
    this.carService.getCarById(carId).subscribe(response => {
      this.cars = response.data[0];
      this.dataLoaded = true;
    });
  }

  getCarImagesByCarId(id:number){
    this.carImageService.getCarImagesByCarId(id).subscribe(response => {
      this.carImages = response.data;
      this.dataLoaded = true;
      console.log(response.data);
    })
  }

  getSliderClassName(index:number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }


 

}
