import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseTextTypeComponent } from './response-text-type.component';

describe('ResponseTextTypeComponent', () => {
  let component: ResponseTextTypeComponent;
  let fixture: ComponentFixture<ResponseTextTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseTextTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseTextTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
