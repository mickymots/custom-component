import { Component } from '@angular/core';
import { NgForm, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  pageForm:any 
  formErrors:any = {
    address:''
  }

  constructor(private fb:FormBuilder){}

  ngOnInit(){
   
   this.pageForm = this.fb.group({
      address:{value:{line1:'', line2:'', line3:'', line4:'', line5:'', postcode:''}, disabled:false}
   })
}
}
