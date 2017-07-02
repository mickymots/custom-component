import { AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { NG_VALIDATORS, Validator } from '@angular/forms';
import {Directive} from '@angular/core'

// validation function
export function validateAddressFactory() : ValidatorFn {
  
  return (c: AbstractControl) => {
    let val = c.value
    console.log(val.line2)
   
    let errors=[]

    if(val && val.line1 && val.line1.length <5)
        errors.push({line:"line 1 is required with minimum length 5"})
    if(val && val.line2 && val.line2.length <5)
        errors.push({line:"line 2 is required with minimum length 5"})

    let isValid = errors.length <= 0 ;
    console.log("c = " + errors)

    if(isValid) {
        console.log("------valid----")
        return null;
    } else {
        console.log("invlaid")
        return {
            address: errors
        };
  }
}
}


@Directive({
  selector: '[validateAddress][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: AddressValidator, multi: true }
  ]})

export class AddressValidator implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateAddressFactory();
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}