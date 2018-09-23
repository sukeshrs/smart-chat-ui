import { Component , HostListener } from '@angular/core';
import { SmartChatModel } from "./model/smart-chat-model.service";
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'app';

  constructor(private smartChatModel : SmartChatModel ){
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {
    this.smartChatModel.removeSessionData();
  }
}
