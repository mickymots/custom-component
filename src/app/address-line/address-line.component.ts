import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, NG_VALIDATORS, ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'address-line',
  template: `<div class="form-group">
              <label [for]="elementName"> {{label}} </label>
              <input type="text" [name]="elementName" class="form-control" [formControl]="childControl"/>
               <small [hidden]="!childControl.hasError('minlength') " class="text-danger">
                  Minimum of {{minlength}} characters
                </small>
                <small [hidden]="!childControl.hasError('required') " class="text-danger">
                 {{label}} is required
                </small>
             </div>`,
 providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: AddressLineComponent, multi: true },
  {provide: NG_VALIDATORS, useExisting: AddressLineComponent, multi: true}]
})
export class AddressLineComponent implements OnInit, ControlValueAccessor,Validator {
  
  //@Input() - property made available by this component that can be set by the parent component
  //e.g. <address-line label="Line 1" elementName="line_1" cssClass="form-control" required="true" 
  //                   [errors]="parentform.addressline.erros" formControlName="line1" />
  @Input() label: string;
  @Input() elementName: string;
  @Input() cssClass: string;
  @Input() required: boolean;  
  @Input() errors: string;
  @Input() validationList: any

  //default minlength
  minlength : number = 0

  ngOnInit(){
    this.setupValidation()
  }
  private childControl = new FormControl('');

  public disabled: any = false;
  
  constructor() {}

  writeValue(value: any) {
    this.childControl.setValue(value); 
  }

  registerOnChange(fn: (value: any) => void) {
    this.childControl.valueChanges.subscribe(fn);
  }

  validate(ctrl) {
     return this.childControl.errors;
  }

  registerOnTouched() {}

  setDisabledState( isDisabled : boolean ) : void {
    this.childControl.disable({onlySelf:isDisabled, emitEvent:false}) 
  }

  setupValidation():void{
    /*---Add List of validator to this control as configured by the parent component --*/
    let validators = []
    if(this.validationList)

      //iterate over configured validations
      this.validationList.forEach(element => {
        let value: string = element

        value == 'required' ? validators.push(Validators.required) : false
          
        if(value.indexOf('minlength')>=0){
          let startIndex = value.indexOf('(') ? value.indexOf('(') : -1
          let endIndex = value.indexOf(')') ? value.indexOf(')') :  -1
          if(startIndex != -1 && endIndex != -1){
             this.minlength = +value.substring(startIndex+1, endIndex)
             validators.push(Validators.minLength(this.minlength))
          }
        }
      });

    this.childControl.setValidators(validators)
  }
}
