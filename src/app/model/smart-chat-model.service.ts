import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BotConfigRepository } from "./bot-config-repository.model";
import { Topic } from './topic.model';

@Injectable()
export class SmartChatModel {
  botConfigList: BotConfigRepository[];
  currentBot: BotConfigRepository;
  currentTopic: Topic;

  constructor() { }
  private subject = new Subject<any>();

  sendTopic(topic: Topic) {
      this.subject.next({topic});
  }

  receiveTopic(): Observable<any>{
    return this.subject.asObservable();
  }


}
