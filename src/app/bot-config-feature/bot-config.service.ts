import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { BotConfigRepository } from "../model/bot-config-repository.model";

@Injectable()
export class BotConfigService {

  private botConfigURL = "https://botz.chat/smart-chat-portal-0.0.1/botconfig";
  constructor(private http: HttpClient) { }

  updateBotConfig(botConfigRespository: BotConfigRepository):Observable<number>{
    return this.http
    .put<number>(this.botConfigURL, botConfigRespository)
    .map(result => result);
  }

}
