import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BotConfigRepository } from "./bot-config-repository.model";
import { Topic } from './topic.model';
import { Button } from './topic/button.model';
import { Element } from './topic/element.model';

@Injectable()
export class SmartChatModel {
  botConfigList: BotConfigRepository[];
  currentBot: BotConfigRepository;
  currentTopic: Topic;
  currentButtons: Button[];
  currentElements: Element[];
  publishLoading : boolean;

  constructor() { }
  private topicSubject = new Subject<any>();
  private messageSubject = new Subject<string>();

  sendTopic(topic: Topic, action: string) {
      this.topicSubject.next({topic: topic, action: action});
  }

  receiveTopic(): Observable<any>{
    return this.topicSubject.asObservable();
  }

  clearTopic() {
    this.topicSubject.next();
  }

  sendMessage(message: string) {
    this.messageSubject.next(message);
  }

  receiveMessage(): Observable<any>{
    return this.messageSubject.asObservable();
  }

  clearMessage() {
    this.messageSubject.next();
  }


}
