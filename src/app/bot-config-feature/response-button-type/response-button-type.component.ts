import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ButtonsComponent } from '../buttons/buttons.component';
import { Response } from '../../model/response.model';
import * as _ from 'lodash';

@Component({
  selector: 'response-button-type',
  templateUrl: './response-button-type.component.html',
  styleUrls: ['./response-button-type.component.scss']
})
export class ResponseButtonTypeComponent implements OnInit {

  @Output() keydownEnter= new EventEmitter<Response>();
  @Input() answer: Response;
  @ViewChild(ButtonsComponent) private buttonsComponent: ButtonsComponent;
  navigationSubscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.initilizeInvites();
        }
      });
    }

  ngOnInit() {
    this.initilizeInvites();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }

  initilizeInvites(){
    let newAnswer={
      attachment:{
        type:"template",
        payload:{
          template_type: "button",
          text:"",
          buttons:[]
        }
      }
    }

    newAnswer.attachment.payload.text=_.get(this.answer,"attachment.payload.text",'');
    newAnswer.attachment.payload.buttons=_.get(this.answer,"attachment.payload.buttons",[]);

    this.answer=newAnswer;
  }

  submitAnswer(){
    this.answer.attachment.payload.buttons=this.buttonsComponent.getButtons();
    this.keydownEnter.emit(this.answer);
  }

  getAnswer(){
    return this.answer;
  }
}
