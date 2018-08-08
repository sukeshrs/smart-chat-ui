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
    if(!this.smartChatModel.currentButtons){
      this.smartChatModel.currentButtons = [];
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
    this.smartChatModel.currentButtons.push(newButton);
  }

  removeButton(i: number){
    this.smartChatModel.currentButtons.splice(i,1);
  }

}
