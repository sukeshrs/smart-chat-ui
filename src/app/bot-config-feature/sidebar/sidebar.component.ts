import { Component, OnInit } from '@angular/core';
import { BotConfigService } from '../bot-config.service';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { BotConfigRepository } from '../../model/bot-config-repository.model';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private botConfigService: BotConfigService,
    private smartChatModel: SmartChatModel) { }

  ngOnInit() {
  }

  publishBot(){

    let kycModel : any;
    kycModel = this.constructKycModel(this.smartChatModel.currentBot);

    console.log('kycModel'+ JSON.stringify(kycModel));
    this.botConfigService.updateBotKyc(kycModel).subscribe(data =>{
      console.log("Updated kycModel: " + JSON.stringify(data));
    })

    this.botConfigService.updateBotConfig(this.smartChatModel.currentBot).subscribe(
      data => {
        console.log("Updated: " + JSON.stringify(data));
      },
      error => console.log("ERROR ::" + error)
    );
  }


  constructKycModel(botConfigRepo : BotConfigRepository) {

   let kyc = {};
   kyc['botId'] = botConfigRepo.botId;
   kyc['key'] = 'key';
   let value = {};
   botConfigRepo.value.topics.forEach((topic) => {
     let currentTopic  = {};
     currentTopic['fulfill_status'] = true;
     currentTopic['follow_message'] = [];
     currentTopic['sample_request'] = topic.questions.join('|');
     currentTopic['slotted'] =false;
     currentTopic['follow'] ='';
     currentTopic['fulfill'] ='internal';
     currentTopic['response'] = topic.answers;
     value[topic.name] =currentTopic;
   })
   kyc['value'] =JSON.stringify(value);
  return kyc;
  }

}
