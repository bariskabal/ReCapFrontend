import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm:FormGroup;
  brand:Brand;
  brandId:number;

  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastr:ToastrService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.brandId=params["brandId"];
        this.createUpdateForm(params["brandId"]);
        this.getBrandById(params["brandId"]);
      }
    })
  }

  getBrandById(brandId:number){
    this.brandService.getBrandById(brandId).subscribe(response => {
      this.brand = response.data;
    })
  }

  createUpdateForm(brandId:number){
    this.brandUpdateForm = this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }

  update(){
    if(this.brandUpdateForm.valid){
      let brand = Object.assign({},this.brandUpdateForm.value)
      brand.brandId = this.brandId;
      
      if(typeof(brand.brandId) == "string"){
        brand.brandId = parseInt(brand.brandId);
      }
      console.log(brand);
      this.brandService.update(brand).subscribe(response=>{
        this.toastr.success("UPDATE OK");
      })
    }else{
      this.toastr.error("UPDATE ERROR");
    }
  }

}
