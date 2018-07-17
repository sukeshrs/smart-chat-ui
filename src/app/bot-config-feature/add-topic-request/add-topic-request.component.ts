import { Component, OnInit } from '@angular/core';
import { Topic } from '../../model/topic.model';
import { SmartChatModel } from "../../model/smart-chat-model.service";

@Component({
  selector: 'add-topic-request',
  templateUrl: './add-topic-request.component.html',
  styleUrls: ['./add-topic-request.component.scss']
})
export class AddTopicRequestComponent implements OnInit {

  topic: Topic;
  question: string;

  constructor(private smartChatModel: SmartChatModel) { }

  ngOnInit() {
    window.scroll(0,0);
    let topics = this.smartChatModel.currentBot.value.topics;
    let currentTopicName = this.smartChatModel.currentTopicName;
    let currentTopicIndex = this.retreiveCurrentTopic(currentTopicName, topics);
    this.topic = topics[currentTopicIndex];
    console.log(JSON.stringify(this.topic));
  }

  public addTopic() {
    // this.smartChatModel.currentBot.value.topic = this.topic;
  }

  public gotToEditResponse(){
    this.smartChatModel.currentBot.stepConfig='editResponse';
  }

  retreiveCurrentTopic(currentTopicName: string, topics: Topic[]): number {
    let topicIndex;
    topics.forEach((topic, index) => {
      if (topic.name === currentTopicName) {
        topicIndex = index;
      }
    });
    return topicIndex;
  }

  public addQuestion() {
    if (this.question) {
      if (!this.topic.questions) {
        this.topic.questions = [];
      }
      let questions = this.topic.questions;
      questions.push(this.question);
      this.topic.questions = this.removeDuplicates(questions);
      console.log(" this.smartChatModelService.currentBot.value" + JSON.stringify(questions));
    }
  }

  public removeQuestion(i: number) {
    this.topic.questions.splice(i,1);
  }

  private removeDuplicates(questions: String[]): String[] {
    return Array.from(new Set(questions));
  }

}
