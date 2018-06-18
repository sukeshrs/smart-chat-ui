import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'create-new-topic',
  templateUrl: './create-new-topic.component.html',
  styleUrls: ['./create-new-topic.component.scss']
})
export class CreateNewTopicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public createDraggableWidget(ele: any) {
    var box_len = $(".generate_box").length;
    var dt_ttl = $(ele).attr('data-title');

    var drag_html = '<div data-id="' + parseInt(box_len + 1) + '" class="draggable_ele generate_box" id="topic_box_' + parseInt(box_len + 1) + '">\
						<a href="javascript:void(0);" class="toggle_btn topic-toggle" onclick="toggle_topic_popup(this);"><img src="../../assets/images/minus.png" /></a>\
						<span class="action-wrap">\
							<a href="javascript:void(0);"><i class="fas fa-pencil-alt"></i></a>\
							<span class="vert-hr"></span>\
							<a href="javascript:void(0);"><i class="fas fa-trash"></i></a>\
						</span>\
						<h4>' + dt_ttl + '</h4>\
						<button type="button" class="edit_btn">Edit Question</button>\
						<button type="button" class="edit_btn">Edit Anwser</button>\
					</div>\
					<div class="path-line" id="line' + parseInt(box_len + 1) + '">\
					</div>';

    $(".drag_fields_block").append(drag_html);
  }
}
