import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Response } from '../../model/response.model';

@Component({
  selector: 'response-text-type',
  templateUrl: './response-text-type.component.html',
  styleUrls: ['./response-text-type.component.scss']
})
export class ResponseTextTypeComponent implements OnInit {

  @Output() textResponse= new EventEmitter<Response>();
  @Input() answer: Response;
  constructor() { }

  ngOnInit() {
    if(!this.answer.text){
      this.answer.text=""
    }
    this.answer.attachment=null;
  }

  submitAnswer(){
    if(this.answer.text != ""){
      this.textResponse.emit(this.answer);
    }
  }

  getAnswer(){
    return this.answer;
  }

}
