import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BotConfigService } from '../bot-config.service';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { BotConfigRepository } from '../../model/bot-config-repository.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  publishLoading: boolean = false;

  constructor(
    private botConfigService: BotConfigService,
    private smartChatModel: SmartChatModel,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  gotoCreateNewTopic() {
    this.smartChatModel.currentBot.stepConfig = 'nameTopic';
    this.smartChatModel.currentTopic = null;
    this.router.navigate(['./topic-name'], { relativeTo: this.route });
  }

  publishBot() {
    this.publishLoading = true;
    this.buildKycModel(this.smartChatModel.currentBot);
  }

  buildKycModel(botConfigRepo: BotConfigRepository) {

    let kyc = {};
    kyc['botId'] = botConfigRepo.botId;
    kyc['key'] = 'key';
    let value = {};
    let arrayOfMethodCall = [];

    /* 
     *Push all the method calls for each topic in to an array.
     *This would help in executing the methods using Observable forkJoin.
    */
    botConfigRepo.value.topics.forEach((topic) => {
      arrayOfMethodCall.push(this.constructTopic(topic));
    });

    //Make parrellel calls to the constructTopic method for each of the topic
    Observable.forkJoin(arrayOfMethodCall).subscribe(result => {
      result.forEach(topicResponse => {
        var test = Object.keys(topicResponse)[0];
        value[test] = topicResponse[test];
      });

      kyc['value'] = JSON.stringify(value);

      //Rest call to save the details for the AI chat bot
      this.botConfigService.updateBotKyc(kyc).subscribe(data => {
        this.publishLoading = false;
      })

      this.botConfigService.updateBotConfig(this.smartChatModel.currentBot).subscribe(
        data => {
          console.log("Updated: " + JSON.stringify(data)); 
        },
        error => console.log("ERROR ::" + error)
      );
    });
  }

  /* 
    This function takes a topic as an argument and for each of the questions in the topic ,
    it fires of a rest call and gets the variation questions.
    sets all the questions returned from the rest call in the sample_request field .
    It also sets all the values in the format which the bot should be published
    
    The function returns an Observable since there is a rest call made in between and the return should happen after the rest 
    call is complete.

  * @param topic
  * @return Observable<any>
  */
  constructTopic(topic): Observable<any> {
    let currentTopic = {};
    let value = {};
    let text = {
      text: 'follow message'
    }
    let topicQuestion = {
      bot_id: this.smartChatModel.currentBot.botId,
      questions: topic.questions
    }

    currentTopic['fulfill_status'] = true;
    currentTopic['follow_message'] = [text];

    return this.botConfigService.postForSynset(topicQuestion).flatMap(questions => {
      currentTopic['sample_request'] = topic.questions.concat(questions).join('|');
      currentTopic['slotted'] = false;
      currentTopic['follow'] = 'appreciate';
      currentTopic['fulfill'] = 'internal';
      currentTopic['response'] = topic.answers;
      value[(topic.name).toLowerCase()] = currentTopic;
      return Observable.of(value);
    })

  }

}
