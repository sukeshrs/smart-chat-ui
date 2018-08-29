import { Component, OnInit, Input } from '@angular/core';
import { Button } from '../../model/topic/button.model';

@Component({
  selector: 'buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  @Input() buttons: Button[];
  constructor() { }

  ngOnInit() {
    if(!this.buttons){
      this.buttons=[];
    }
  }

  getButtons(){
    return(this.buttons);
  }

  addButton(){
    let newButton: Button;
    newButton = {
      type: "",
      title: "",
      url:"",
      payload:""
    }
    this.buttons.push(newButton);
  }

  removeButton(i: number){
    this.buttons.splice(i,1);
  }

}
