import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseButtonTypeComponent } from './response-button-type.component';

describe('ResponseButtonTypeComponent', () => {
  let component: ResponseButtonTypeComponent;
  let fixture: ComponentFixture<ResponseButtonTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseButtonTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseButtonTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
