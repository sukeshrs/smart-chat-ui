import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { SmartChatModel } from "../../model/smart-chat-model.service";

@Component({
  selector: 'response-text-type',
  templateUrl: './response-text-type.component.html',
  styleUrls: ['./response-text-type.component.scss']
})
export class ResponseTextTypeComponent implements OnInit {

  @Output() keydownEnter= new EventEmitter<string>();
  @Input() public textResponse: string;
  constructor(private smartChatModel: SmartChatModel) { }

  ngOnInit() {

  }

  submitResponse(){
    this.keydownEnter.emit(this.textResponse);
  }

}
