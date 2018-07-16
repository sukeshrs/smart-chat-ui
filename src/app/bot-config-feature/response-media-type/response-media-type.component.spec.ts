import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseMediaTypeComponent } from './response-media-type.component';

describe('ResponseMediaTypeComponent', () => {
  let component: ResponseMediaTypeComponent;
  let fixture: ComponentFixture<ResponseMediaTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseMediaTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseMediaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
