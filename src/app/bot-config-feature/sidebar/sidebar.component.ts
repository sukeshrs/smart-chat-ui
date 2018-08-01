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

  publishLoading : boolean =false;

  constructor(
    private botConfigService: BotConfigService,
    private smartChatModel: SmartChatModel,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  gotoCreateNewTopic(){
    this.smartChatModel.currentBot.stepConfig='nameTopic';
    this.smartChatModel.currentTopic=null;
    this.router.navigate(['./topic-name'], { relativeTo: this.route });
  }

  publishBot(){
    this.publishLoading=true;
    this.constructKycModel(this.smartChatModel.currentBot);
  } 

  constructKycModel(botConfigRepo : BotConfigRepository) {

   let kyc = {};
   kyc['botId'] = botConfigRepo.botId;
   kyc['key'] = 'key';
   let value = {};


   let arrayOfMethodCall = [];

   //Push all the method calls for each topic in to an array. This would help in executing forkJoin
   botConfigRepo.value.topics.forEach((topic) => {
    arrayOfMethodCall.push(this.constructTopic(topic));
   });

   //Make parrellel calls to the constructTopic method
   Observable.forkJoin(arrayOfMethodCall).subscribe(result=>{

     result.forEach(topicResponse => {
       var test = Object.keys(topicResponse)[0];
       value[test] = topicResponse[test];
     });

     console.log("value inside subscripbe" + JSON.stringify(value));
     kyc['value'] =JSON.stringify(value);

     this.botConfigService.updateBotKyc(kyc).subscribe(data =>{
       console.log("Updated kyc: " + JSON.stringify(data));
       this.publishLoading=false;
     })

    this.botConfigService.updateBotConfig(this.smartChatModel.currentBot).subscribe(
      data => {
        console.log("Updated: " + JSON.stringify(data));
      },
      error => console.log("ERROR ::" + error)
    );
   });
  }


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
