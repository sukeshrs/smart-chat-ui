import { Component, OnInit } from '@angular/core';
import { BotConfigService } from '../bot-config.service';
import { SmartChatModel } from "../../model/smart-chat-model.service";

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
    this.botConfigService.updateBotConfig(this.smartChatModel.currentBot).subscribe(
      data => {
        console.log("Updated: " + JSON.stringify(data));
      },
      error => console.log("ERROR ::" + error)
    );
  }

}
