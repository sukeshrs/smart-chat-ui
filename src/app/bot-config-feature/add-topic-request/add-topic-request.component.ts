import { Component, OnInit } from '@angular/core';
import { Topic } from '../../model/topic.model';
import { SmartChatModelService } from '../../providers/smart-chat-model.service';

@Component({
  selector: 'add-topic-request',
  templateUrl: './add-topic-request.component.html',
  styleUrls: ['./add-topic-request.component.scss']
})
export class AddTopicRequestComponent implements OnInit {

  topic : Topic;
  question : string;

  constructor(private smartChatModelService: SmartChatModelService) { }

  ngOnInit() {
    this.topic = {name : ''};
  }

  public addTopic(){
    this.smartChatModelService.currentBot.value.topic = this.topic;
    console.log(" this.smartChatModelService.currentBot.value" + JSON.stringify( this.smartChatModelService.currentBot.value));
  }

  public addQuestion() {
    if (this.question) {
      if (!this.smartChatModelService.currentBot.value.topic.questions) {
        this.smartChatModelService.currentBot.value.topic.questions = [];
      }
      let questions = this.smartChatModelService.currentBot.value.topic.questions;
      questions.push(this.question);
      questions = this.removeDuplicates(questions);
      this.smartChatModelService.currentBot.value.topic.questions = questions;
      console.log(" this.smartChatModelService.currentBot.value" + JSON.stringify(this.smartChatModelService.currentBot.value));
    }
  }

  public removeQuestion(i: number){
    this.smartChatModelService.currentBot.value.topic.questions.splice(i);
  }

  private removeDuplicates(questions: string[]): string[] {
    return Array.from(new Set(questions));
  }
}
