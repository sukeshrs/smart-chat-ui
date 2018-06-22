import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';
import { ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[ccDraggable]'
})
export class DraggableDirective {

  // constructor(private el: ElementRef,
  //             private renderer: Renderer) {
  // }

  @Output() dragStart = new EventEmitter<MouseEvent>();
  @Output() dragMove = new EventEmitter<MouseEvent>();
  @Output() dragStop = new EventEmitter<MouseEvent>();

  //adds draggable class to element for styling purposes
  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;

  //mouse down: dragStart
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void{
    //parent draggable items won't move together with child
    event.stopPropagation();
    this.dragStart.emit(event);
    this.dragging = true;
  }
  //mouse move: dragMove (document)
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void{
    if (!this.dragging){
      return;
    }
    this.dragMove.emit(event);
  }

  //mouse up: dragEnd
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void{
    this.dragStop.emit(event);
    this.dragging = false;
  }

}
