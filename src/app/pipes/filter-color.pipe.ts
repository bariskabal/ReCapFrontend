import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color/color';

@Pipe({
  name: 'filterColorPipe'
})
export class FilterColorPipe implements PipeTransform {

  transform(value: Color[], filterColorText: string): Color[] {
    filterColorText= filterColorText ? filterColorText.toLocaleLowerCase():"";
    return filterColorText? value.filter((c:Color)=>c.colorName.toLocaleLowerCase().indexOf(filterColorText)!==-1):value;
  }

}
