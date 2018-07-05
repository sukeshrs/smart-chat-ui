import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { BotConfigRepository } from "../model/bot-config-repository.model";

@Injectable()
export class BotConfigService {

  private botConfigURL = "http://localhost:8080/smart-chat-portal/botconfig";
  constructor(private http: HttpClient) { }

  updateBotConfig(botConfigRespository: BotConfigRepository):Observable<number>{
    return this.http
    .put<number>(this.botConfigURL, botConfigRespository)
    .map(result => result);
  }

}
