import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotTemplatesComponent } from './bot-templates.component';

describe('BotTemplatesComponent', () => {
  let component: BotTemplatesComponent;
  let fixture: ComponentFixture<BotTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
