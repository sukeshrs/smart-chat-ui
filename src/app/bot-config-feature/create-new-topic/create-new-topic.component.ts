import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Topic } from '../../model/topic.model';
import * as $ from 'jquery';

@Component({
  selector: 'create-new-topic',
  templateUrl: './create-new-topic.component.html',
  styleUrls: ['./create-new-topic.component.scss']
})
export class CreateNewTopicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output() addTopicEvent = new EventEmitter<Topic>();

  public createDraggableWidget(topicName) {
    var topic: Topic = {
      name: topicName,
      status: null,
      questions: null,
      answers: null,
      additionalDisplay: null
    };

    this.addTopicEvent.emit(topic);
  }
}
