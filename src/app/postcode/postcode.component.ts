import { Component, EventEmitter, OnInit, Input, Output, forwardRef } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
//define no operation function
const noop = () => { }
export interface Address {
  line1: string, line2: string, line3: string, line4: string,
  line5: string, postcode: string
}

@Component({
  selector: 'postcode',
  templateUrl: './postcode.component.html',
  styleUrls: ['./postcode.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PostcodeComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PostcodeComponent),
    multi: true,
  }]
})

export class PostcodeComponent implements  ControlValueAccessor, Validator {

  onchangeCallback: (_: any) => void = noop

  @Input() elementID: string
  @Input() cssClass: string
  @Output() selectedAddress: EventEmitter<Address> = new EventEmitter<Address>()
  
  public typeaheadLoading: boolean;
  public typeaheadNoResults: boolean;
  public dataSource: Observable<any>;

  _postCode: string = ''
  get postcode() {
    return this._postCode
  }
  set postcode(v) {
    this._postCode = v
    this.onchangeCallback(v)
  }
  public constructor(private http: Http) {
    this.dataSource = Observable
      .create((observer: any) => {
        // Runs on every search
        observer.next(this.postcode);
      })
      .mergeMap((token: string) => this.getStatesAsObservable(token));
  }
 
  public getStatesAsObservable(token: string): Observable<any> {
   
    return this.http.get('api/postcode?name='+token)
    .map((res: Response) => {let postCodeArr = res.json().data
                             let arr=[]
                             postCodeArr.forEach(element => {
                               element.addresses? element.addresses.forEach(e => arr.push(e)): false
                               //arr.push(element)
                             });
                             return arr
                            })
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));; 
  }


  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
 
  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }
 
  public typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
  }

  selected($event) {
    console.log($event)
    let address: Address = { line1: $event.item.line1, line2: $event.item.line2,
       line3: $event.item.line3, line4: $event.item.line4, 
       line5: $event.item.line5, postcode: $event.item.postcode }
    this.selectedAddress.emit(address)
  }

  //framework required method
  writeValue(value: any) {
    if (value !== undefined)
      this._postCode = value
  }

  //framework required method
  registerOnChange(fn) {
    this.onchangeCallback = fn
  }

  //framework required method
  registerOnTouched(fn) { }

  validate(c: FormControl) {
    let result = this.postcode ? this.checkPostcode(this.postcode): null
    return result
  }

  checkPostcode(postcode: string){
       let query = new RegExp(/^[a-zA-Z]{1,2}([0-9]{1,2}|[0-9][a-zA-Z])\s*[0-9][a-zA-Z]{2}$/)
        return query.test(postcode)? null: { "error_value": "invalid postcode" }
  }

}

