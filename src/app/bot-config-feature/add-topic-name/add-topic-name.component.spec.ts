import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopicNameComponent } from './add-topic-name.component';

describe('AddTopicNameComponent', () => {
  let component: AddTopicNameComponent;
  let fixture: ComponentFixture<AddTopicNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTopicNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTopicNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
