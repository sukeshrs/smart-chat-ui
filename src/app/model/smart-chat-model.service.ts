import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { BotConfigRepository } from "./bot-config-repository.model";
import { Topic } from './topic.model';
import { Button } from './topic/button.model';
import { Element } from './topic/element.model';

@Injectable()
export class SmartChatModel {
  botConfigList: BotConfigRepository[];
  currentBot: BotConfigRepository;
  currentTopic: Topic;
  publishLoading : boolean;

  constructor(@Inject(SESSION_STORAGE) private sessionData: WebStorageService) { }
  private topicSubject = new Subject<any>();
  private messageSubject = new Subject<string>();

  storeSessionData(key:string, val:any) {
    this.sessionData.set(key, val);
  }

  retrieveSessionData() {
    this.botConfigList=this.sessionData.get("botConfigList");
    this.currentBot=this.sessionData.get("currentBot");
    let curTopic =this.sessionData.get("currentTopic");
    this.currentTopic = this.currentBot.value.topics.find( topic =>{
      return topic.name === curTopic.name;
    })
  }

  removeSessionData() {
    this.sessionData.remove('botConfigList');
    this.sessionData.remove('currentBot');
    this.sessionData.remove('currentTopic');
  }

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
