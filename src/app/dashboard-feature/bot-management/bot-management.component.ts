import { Component, OnInit } from '@angular/core';
import { BotConfigRespository } from "../../model/bot-config-repository.model";
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'bot-management',
  templateUrl: './bot-management.component.html',
  styleUrls: ['./bot-management.component.scss']
})
export class BotManagementComponent implements OnInit {
  public botConfigList : BotConfigRespository[];

  constructor(private dashboardService : DashboardService) { }

  ngOnInit() {
      this.getBotConfigList();
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

}
