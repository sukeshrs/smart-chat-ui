import { Component, OnInit } from '@angular/core';
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
  constructor(private smartChatModel: SmartChatModel) { }

  ngOnInit() {
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

}
