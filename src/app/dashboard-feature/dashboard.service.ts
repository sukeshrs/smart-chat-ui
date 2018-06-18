import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { BotConfigRespository } from "../model/bot-config-repository.model";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {

  private botConfigURL = "http://localhost:8080/smart-chat-portal/botconfig";
    constructor(private http: HttpClient) { }

    getBotConfigList(): Observable<BotConfigRespository[]>{
      return this.http
      .get<BotConfigRespository[]>(this.botConfigURL)
      .map(result => result);
    }

}
