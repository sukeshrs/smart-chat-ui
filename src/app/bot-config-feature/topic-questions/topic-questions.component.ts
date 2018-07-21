import { Component, OnInit } from '@angular/core';
import { Topic } from '../../model/topic.model';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'topic-questions',
  templateUrl: './topic-questions.component.html',
  styleUrls: ['./topic-questions.component.scss']
})
export class TopicQuestionsComponent implements OnInit {

  topic: Topic;
  question: string;

  constructor(
    private smartChatModel: SmartChatModel,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    window.scroll(0,0);
    this.topic = this.smartChatModel.currentTopic;
    if (!this.topic.questions) {
      this.topic.questions = [];
    }
    this.question = "";
    console.log("Current Topic: " + JSON.stringify(this.topic));
    console.log("Current Bot: " + JSON.stringify(this.smartChatModel.currentBot));
  }

  public addTopic() {
    // this.smartChatModel.currentBot.value.topic = this.topic;
  }

  public gotoTopicAnswers(){
    this.smartChatModel.currentBot.stepConfig='editAnswers';
    this.smartChatModel.sendTopic(this.topic);
    this.router.navigate(['../topic-answers'], { relativeTo: this.route });
  }

  public addQuestion() {
    if (this.question) {
      let questions = this.topic.questions;
      questions.push(this.question);
      this.question = "";
      this.topic.questions = this.removeDuplicates(questions);
      console.log("Questions: " + JSON.stringify(questions));
    }
  }

  public removeQuestion(i: number) {
    this.topic.questions.splice(i,1);
  }

  private removeDuplicates(questions: String[]): String[] {
    return Array.from(new Set(questions));
  }

  // retreiveCurrentTopic(currentTopicName: string, topics: Topic[]): number {
  //   let topicIndex;
  //   topics.forEach((topic, index) => {
  //     if (topic.name === currentTopicName) {
  //       topicIndex = index;
  //     }
  //   });
  //   return topicIndex;
  // }

}
