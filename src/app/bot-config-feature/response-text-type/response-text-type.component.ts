import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Topic } from '../../model/topic.model';
import { Response } from '../../model/response.model';
import { SmartChatModel } from "../../model/smart-chat-model.service";

@Component({
  selector: 'response-text-type',
  templateUrl: './response-text-type.component.html',
  styleUrls: ['./response-text-type.component.scss']
})
export class ResponseTextTypeComponent implements OnInit {

  @Input()
  public topic: Topic;
  public text: string;
  public textResponse : Response;
  constructor(private smartChatModel: SmartChatModel) { }

  ngOnInit() {
    if (!this.topic.answers) {
      this.topic.answers = [];
    }
    this.topic.answers.forEach(response => {
      if (response.text) {
        this.textResponse = response;
      }
    });

    if(!this.textResponse){
      this.textResponse ={
        text :''
      };
      this.topic.answers.push(this.textResponse);
    }
  }
}
