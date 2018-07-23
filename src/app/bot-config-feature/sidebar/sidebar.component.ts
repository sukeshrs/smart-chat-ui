import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BotConfigService } from '../bot-config.service';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { BotConfigRepository } from '../../model/bot-config-repository.model';

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

  publishBot(){

    let kycModel : any;
    kycModel = this.constructKycModel(this.smartChatModel.currentBot);

    this.publishLoading=true;
    console.log('kycModel'+ JSON.stringify(kycModel));
    this.botConfigService.updateBotKyc(kycModel).subscribe(data =>{
      console.log("Updated kycModel: " + JSON.stringify(data));
      this.publishLoading=false;
    })

    this.botConfigService.updateBotConfig(this.smartChatModel.currentBot).subscribe(
      data => {
        console.log("Updated: " + JSON.stringify(data));
      },
      error => console.log("ERROR ::" + error)
    );
  }

  gotoCreateNewTopic(){
    this.smartChatModel.currentBot.stepConfig='nameTopic';
    this.smartChatModel.currentTopic=null;
    this.router.navigate(['./topic-name'], { relativeTo: this.route });
  }

  constructKycModel(botConfigRepo : BotConfigRepository) {

   let kyc = {};
   kyc['botId'] = botConfigRepo.botId;
   kyc['key'] = 'key';
   let value = {};
   botConfigRepo.value.topics.forEach((topic) => {
     let currentTopic  = {};

     let text = {
       text : 'follow message'
     }
    
     currentTopic['fulfill_status'] = true;
     currentTopic['follow_message'] = [text];
     currentTopic['sample_request'] = topic.questions.join('|');
     currentTopic['slotted'] =false;
     currentTopic['follow'] ='appreciate';
     currentTopic['fulfill'] ='internal';
     currentTopic['response'] = topic.answers;
     value[(topic.name).toLowerCase()] =currentTopic;
   })
   kyc['value'] =JSON.stringify(value);
  return kyc;
  }

}
