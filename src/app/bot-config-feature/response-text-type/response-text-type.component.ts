import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Topic } from '../../model/topic.model';

@Component({
  selector: 'response-text-type',
  templateUrl: './response-text-type.component.html',
  styleUrls: ['./response-text-type.component.scss']
})
export class ResponseTextTypeComponent implements OnInit {

  @Input()
  public topic : Topic;
  constructor() { }

  ngOnInit() {
    if(!this.topic.answers[0]){
      this.topic.answers=[''];
    }
  }

}
