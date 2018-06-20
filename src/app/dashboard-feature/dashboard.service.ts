import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { BotConfigRepository } from "../model/bot-config-repository.model";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {

  private botConfigURL = "http://localhost:8080/smart-chat-portal/botconfig";
    constructor(private http: HttpClient) { }

    startBotCreation(configInput: BotConfigRepository): Observable<BotConfigRepository> {
      return this.http
        .post<BotConfigRepository>(this.botConfigURL, configInput)
        .map(result => result)
    }
    getBotConfigList(): Observable<BotConfigRepository[]>{
      return this.http
      .get<BotConfigRepository[]>(this.botConfigURL)
      .map(result => result);
    }
    deleteBotConfig(botConfig: BotConfigRepository):Observable<number>{
      return this.http
      .put<number>(this.botConfigURL + "/delete", botConfig)
      .map(result => result);
    }

}
