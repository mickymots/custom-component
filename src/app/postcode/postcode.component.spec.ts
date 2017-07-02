import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcodeComponent } from './postcode.component';

describe('PostcodeComponent', () => {
  let component: PostcodeComponent;
  let fixture: ComponentFixture<PostcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
