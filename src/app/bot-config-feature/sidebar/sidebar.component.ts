import { Component, OnInit } from '@angular/core';
import { BotConfigService } from '../bot-config.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private botConfigService: BotConfigService) { }

  ngOnInit() {
  }

  publishBot(){
    
  }

}
