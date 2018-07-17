import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseGenericTypeComponent } from './response-generic-type.component';

describe('ResponseGenericTypeComponent', () => {
  let component: ResponseGenericTypeComponent;
  let fixture: ComponentFixture<ResponseGenericTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseGenericTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseGenericTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
