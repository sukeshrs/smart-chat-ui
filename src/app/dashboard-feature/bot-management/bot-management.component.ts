import { Component, OnInit } from '@angular/core';
import { BotConfigRepository } from "../../model/bot-config-repository.model";
import { BotConfig } from "../../model/bot-config.model";
import { Name } from "../../model/name.model";
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bot-management',
  templateUrl: './bot-management.component.html',
  styleUrls: ['./bot-management.component.scss']
})
export class BotManagementComponent implements OnInit {
  public botConfigList: BotConfigRepository[];
  private name: Name;
  public botDetails : BotConfigRepository;

  constructor(private dashboardService: DashboardService,
    private router: Router) { }

  ngOnInit() {
    this.getBotConfigList();
    this.name = {
      botName: '',
      botDesc: ''
    };
  }

  getBotConfigList() {
    this.dashboardService.getBotConfigList().subscribe(
      data => {
        this.botConfigList = data;
        // this.botConfigList.forEach(function (entry) {
        //   console.log("entry" + entry);
        //   let string = JSON.stringify(entry.value);
        //   let temp =JSON.parse(string);
        //   let value = JSON.parse(temp);
        //   entry.value = value;
        // });
        console.log(this.botConfigList);
      },
      error => console.log("ERROR ::" + error)
    );
  }

  deleteBotConfig(botConfig: BotConfigRepository) {
    this.dashboardService.deleteBotConfig(botConfig).subscribe(
      data => {
        if (data >= 1) {
          this.getBotConfigList();
        }
        console.log("Deleted: " + JSON.stringify(data));
      },
      error => console.log("ERROR ::" + error)
    );
  }

  submitModalData(event: any) {
    console.log(this.name);
    let botConfigRepo: BotConfigRepository;
    let value: BotConfig;
    value = { name: this.name };
    //the bot id mentioned is not eally used , since it is created on the database when data is inserted
    botConfigRepo = {
      botId: '1',
      stepConfig: 'name',
      value: value,
      status: 'N'
    };

    this.dashboardService.startBotCreation(botConfigRepo).subscribe(
      data => {
        this.botDetails = data;
      },
      error => console.log("ERROR ::" + error)
    );
    this.router.navigate(['/bot-config']);
  }
}
