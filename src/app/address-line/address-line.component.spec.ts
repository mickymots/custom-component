import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressLineComponent } from './address-line.component';

describe('AddressLineComponent', () => {
  let component: AddressLineComponent;
  let fixture: ComponentFixture<AddressLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
