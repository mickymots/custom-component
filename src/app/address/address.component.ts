//our root app component
import { Component, Input } from '@angular/core'
import {
  FormControl, FormGroup, ControlValueAccessor,
  NG_VALUE_ACCESSOR, FormBuilder, NG_VALIDATORS, Validators,
  Validator, ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'address',
  template: `<h1>Address</h1>
  <div [formGroup]="name">
    <address-line elementName="line1"  label="Line 1"  formControlName="line1" > </address-line>
    <address-line elementName="line2"  label="Line 2"  formControlName="line2" > </address-line>
    <address-line elementName="line3"  label="Line 3"  formControlName="line3" > </address-line>
    <address-line elementName="line4"  label="Line 4"  formControlName="line4" > </address-line>
    <address-line elementName="line5"  label="Line 5"  formControlName="line5" > </address-line>
    <postcode formControlName="postcode" (selectedAddress)="updateForm($event)"> </postcode>
  </div>`,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: AddressComponent, multi: true },
    { provide: NG_VALIDATORS, useExisting: AddressComponent, multi: true }
  ]
})

export class AddressComponent implements ControlValueAccessor, Validator {
  name: FormGroup;
  errors: ValidationErrors
  constructor(fb: FormBuilder) {
    this.name = fb.group({
      line1: [''],
      line2: [''],
      line3: [''],
      line4: [''],
      line5: [''],
      postcode: ['']
    });
  }

  updateForm($event) {
    console.log($event)
    this.name.setValue({
      line1: $event.line1, line2: $event.line2,
      line3: $event.line3, line4: $event.line4, line5: $event.line5, postcode: $event.postcode
    })
  }

  writeValue(value: any) {
    if (value) {
      this.name.setValue(value);
    }
    this.errors = null
  }

  registerOnChange(fn: (value: any) => void) {
    this.name.valueChanges.subscribe(fn);
  }

  registerOnTouched() { }

  setDisabledState(isDisabled: boolean): void {
    this.name.disable({ onlySelf: isDisabled, emitEvent: false })
  }

  validate(ctrl) {
    // If you have multiple validators, you'd probably 
    // want to build the error object from scratch
    this.errors = null
    let temp = []
    if (this.name.get('line1').errors)
      temp.push(this.name.get('line1').errors)
    if (this.name.get('line2').errors)
      temp.push(this.name.get('line2').errors)
    if (this.name.get('line4').errors)
      temp.push(this.name.get('line4').errors)
    if (this.name.get('postcode').errors)
      temp.push(this.name.get('postcode').errors)
    this.errors = temp
    return this.errors;
  }
}