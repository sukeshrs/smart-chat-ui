import { Directive, HostListener, HostBinding, Input, ElementRef } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

//good practice
interface Position{
  x: number;
  y: number;
}

@Directive({
  selector: '[ccMovable]'
})
export class MovableDirective extends DraggableDirective{

  @HostBinding('style.transform') get transform(): SafeStyle{
    return this.sanitizer.bypassSecurityTrustStyle(`translateX(${this.position.x}px) translateY(${this.position.y}px)`);
  }

  public position: Position ={x:0, y:0};
  private startPosition: Position;

  constructor(private sanitizer: DomSanitizer, public element: ElementRef){
    //Dom Sanitizer to by pass security and avoid Warning
    super();
  }
  @Input('movableReset') reset = false;

  @HostListener('dragStart', ['$event'])
  onDragStart(event: MouseEvent){
    //console.log('Item started moving');
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    }

  }
  @HostListener('dragMove', ['$event'])
  onDragMove(event: MouseEvent){
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
    //console.log('Item moving');
  }
  @HostListener('dragStop', ['$event'])
  onDragStop(event: MouseEvent){
    if (this.reset){
      this.position = {x:0, y:0};
    }
    //console.log('Item stopped moving');
  }
}
