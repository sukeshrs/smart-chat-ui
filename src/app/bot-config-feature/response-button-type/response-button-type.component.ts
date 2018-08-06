import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Input, Output, EventEmitter } from '@angular/core';
import { Topic } from '../../model/topic.model';
import { Button } from '../../model/topic/button.model';
import { SmartChatModel } from "../../model/smart-chat-model.service";

@Component({
  selector: 'response-button-type',
  templateUrl: './response-button-type.component.html',
  styleUrls: ['./response-button-type.component.scss']
})
export class ResponseButtonTypeComponent implements OnInit {

  public buttons: Button[];
  navigationSubscription;

  constructor(
    private smartChatModel: SmartChatModel,
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
    this.buttons=this.smartChatModel.currentTopic.answers[0].attachment.payload.buttons;
    if(!this.buttons){
      this.buttons = [];
    }
  }
  
  addButton(){
    let newButton: Button;
    newButton = {
      type: "",
      title: "",
      url:"",
      payload:""
    }
    this.buttons.push(newButton);
  }

  removeButton(i: number){
    this.buttons.splice(i,1);
  }

}
