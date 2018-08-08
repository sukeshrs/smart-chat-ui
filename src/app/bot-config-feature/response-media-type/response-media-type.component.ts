import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { Element } from "../../model/topic/element.model";

@Component({
  selector: 'response-media-type',
  templateUrl: './response-media-type.component.html',
  styleUrls: ['./response-media-type.component.scss']
})
export class ResponseMediaTypeComponent implements OnInit {

  element: Element;
  navigationSubscription;
  constructor(
    private smartChatModel: SmartChatModel,
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

  initilizeInvites(){
    if(!this.smartChatModel.currentElements || this.smartChatModel.currentElements.length == 0){
      this.element={
        media_type:'',
        url:'',
        buttons:[]
      }
      this.smartChatModel.currentElements=[];
      this.smartChatModel.currentElements.push(this.element);
    }
    else{
      this.element=this.smartChatModel.currentElements[0];
    }
  }

}
