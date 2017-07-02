import {
  FormControl,
  ControlValueAccessor,
} from '@angular/forms';
import {
  Input
} from '@angular/core';
export class BaseComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() cssClass: string
  private childControl = new FormControl();

  writeValue(value: any) {
    this.childControl.setValue(value);
  }
 
  registerOnChange(fn: (value: any) => void) {
    this.childControl.valueChanges.subscribe(fn);
  }

  registerOnTouched() {}

  setDisabledState( isDisabled : boolean ) : void {
    this.childControl.disable({onlySelf:isDisabled, emitEvent:false}) 
  }
}

