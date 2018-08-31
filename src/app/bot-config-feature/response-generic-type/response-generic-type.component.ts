import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Response } from '../../model/response.model';
import { Element } from '../../model/topic/element.model';
import * as _ from 'lodash';

@Component({
  selector: 'response-generic-type',
  templateUrl: './response-generic-type.component.html',
  styleUrls: ['./response-generic-type.component.scss']
})
export class ResponseGenericTypeComponent implements OnInit {

  navigationSubscription;
  @Input() answer: Response;

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
    let newElement: Element;
    newElement = {
      url:"",
      title:"",
      subtitle:"",
      buttons:[]
    }

    let newAnswer={
      attachment:{
        type:"template",
        payload:{
          template_type:"generic",
          sharable: "false",
          elements:[]
        }
      }
    }
    if(_.get(this.answer,"attachment.payload.elements",[]).length > 0){
      newAnswer.attachment.payload.elements=_.get(this.answer,"attachment.payload.elements");
    }
    else{
      newAnswer.attachment.payload.elements=[newElement];
    }
    this.answer=newAnswer;
  }

  getAnswer(){
    return this.answer;
  }

  addElement(){
    let newElement: Element;
    newElement = {
      url:"",
      title:"",
      subtitle:"",
      buttons:[]
    }
    this.answer.attachment.payload.elements.push(newElement);
  }

}
