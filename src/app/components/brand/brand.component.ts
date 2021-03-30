import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[] = [];
  currentBrand:Brand;
  dataLoaded=false;
  filterBrandText = "";

  constructor(private brandService:BrandService) { }

  ngOnInit() {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
      this.dataLoaded=true;
    })
  }
  getAllBrandClass(){
    if (!this.currentBrand) {
      return "list-group-item active" 
    }
    else{
        return "list-group-item"
    }
  }
  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }
  getCurrentBrandClass(brand:Brand){
    if(brand==this.currentBrand){
      return "list-group-item list-group-item-dark"
    }
    else{
      return "list-group-item"
    }
  }

  removeCurrentBrand(){
    this.filterBrandText = "";
    this.currentBrand = {brandId:-1,brandName:""};
  }

}
