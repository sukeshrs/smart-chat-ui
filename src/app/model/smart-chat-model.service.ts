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
  private subject = new Subject<any>();

  sendTopic(topic: Topic) {
      this.subject.next({topic});
  }

  receiveTopic(): Observable<any>{
    return this.subject.asObservable();
  }


}
