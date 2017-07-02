import { Component, OnInit, Input } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-name-group',
  templateUrl: './name-group.component.html',
  styleUrls: ['./name-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NameGroupComponent,
      multi: true
    }
  ]
})
export class NameGroupComponent implements ControlValueAccessor {

  @Input() label:string;
  @Input() required: boolean;
  @Input() help: boolean;
  @Input() id: string;
  @Input() regex: RegExp;

  private childControl = new FormControl('',Validators.pattern(/^([^0-9@]*)$/));
  //private childControl = new FormControl();

  constructor() {}

  writeValue(value: any) {   
    this.childControl.setValue(value);
  }

  // validateName(name) {
  //   var regex = /^([^0-9@]*)$/;
  //   return this.regex.test(name);
  // }

  get errorMessage() {
    //var name = this.childControl.value;        
    // if (!this.validateName(name)) {  
      if(this.childControl.errors){    
        return this.label + " has errors";
      } 
      return null;   
  }
   
  registerOnChange(fn: (value: any) => void) {
    this.childControl.valueChanges.subscribe(fn);
  }

  registerOnTouched() {}

}