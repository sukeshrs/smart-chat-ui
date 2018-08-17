import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Response } from '../../model/response.model';

@Component({
  selector: 'response-media-type',
  templateUrl: './response-media-type.component.html',
  styleUrls: ['./response-media-type.component.scss']
})
export class ResponseMediaTypeComponent implements OnInit {

  @Output() keydownEnter= new EventEmitter<Response>();
  @Input() private answer: Response;
  navigationSubscription;
  constructor(
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
    let newAnswer={
      attachment:{
        type:"",
        payload:{
          url:""
        }
      }
    }
    if(this.answer.attachment &&
       this.answer.attachment.payload){
         newAnswer.attachment.type=this.answer.attachment.type;
         newAnswer.attachment.payload.url=this.answer.attachment.payload.url;
    }
    this.answer=newAnswer;
  }

  submitAnswer(){
    this.keydownEnter.emit(this.answer);
  }

  getAnswer(){
    return this.answer;
  }

}
