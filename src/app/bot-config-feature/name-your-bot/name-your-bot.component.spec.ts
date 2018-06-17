import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameYourBotComponent } from './name-your-bot.component';

describe('NameYourBotComponent', () => {
  let component: NameYourBotComponent;
  let fixture: ComponentFixture<NameYourBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameYourBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameYourBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
