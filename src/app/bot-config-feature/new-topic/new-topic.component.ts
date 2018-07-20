import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Topic } from '../../model/topic.model';
import * as $ from 'jquery';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.scss']
})
export class NewTopicComponent implements OnInit {

  constructor(
    private smartChatModel: SmartChatModel,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.smartChatModel.currentTopic = null;
  }

  public createPresetTopic(topicName) {
    var topic: Topic = {
      name: topicName
    };
    this.smartChatModel.sendTopic(topic);
  }

  public createNewTopic(){
    this.smartChatModel.currentBot.stepConfig='nameTopic';
    this.router.navigate(['./topic-name'], { relativeTo: this.route });
  }
}
