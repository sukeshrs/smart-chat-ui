import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopicRequestComponent } from './add-topic-request.component';

describe('AddTopicRequestComponent', () => {
  let component: AddTopicRequestComponent;
  let fixture: ComponentFixture<AddTopicRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTopicRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTopicRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
