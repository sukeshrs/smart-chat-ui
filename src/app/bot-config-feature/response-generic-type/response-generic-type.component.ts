import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SmartChatModel } from "../../model/smart-chat-model.service";

@Component({
  selector: 'response-generic-type',
  templateUrl: './response-generic-type.component.html',
  styleUrls: ['./response-generic-type.component.scss']
})
export class ResponseGenericTypeComponent implements OnInit {

  navigationSubscription;

  constructor(
    public smartChatModel: SmartChatModel,
    private route: ActivatedRoute,
    private router: Router) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.initilizeInvites();
        }
      });
    }

  ngOnInit() {
    this.initilizeInvites();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }

  initilizeInvites(){}

}
