import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Topic } from '../../model/topic.model';
import { SmartChatModel } from "../../model/smart-chat-model.service";

@Component({
  selector: 'response-text-type',
  templateUrl: './response-text-type.component.html',
  styleUrls: ['./response-text-type.component.scss']
})
export class ResponseTextTypeComponent implements OnInit {

  @Input()
  public topic : any;
  constructor(private smartChatModel: SmartChatModel) { }

  ngOnInit() {
    if(!this.topic.answers){
      this.topic.answers=[''];
    }
  }

}
