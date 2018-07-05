import { Injectable } from '@angular/core';
import { BotConfigRepository } from "./bot-config-repository.model";

@Injectable()
export class SmartChatModel {
  botConfigList: BotConfigRepository[];
  currentBot: BotConfigRepository;

  constructor() { }

}
