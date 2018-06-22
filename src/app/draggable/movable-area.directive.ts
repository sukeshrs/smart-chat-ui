import { ContentChildren, Directive, QueryList, ElementRef } from '@angular/core';
import { MovableDirective } from './movable.directive';
import { Subscription } from 'rxjs/Subscription';

interface Boundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
@Directive({
  selector: '[ccMovableArea]'
})
export class MovableAreaDirective {

  @ContentChildren(MovableDirective) movables: QueryList<MovableDirective>

  private boundaries: Boundaries;
  //keep tract of subsriptions to no add multiple calls
  private subscriptions: Subscription[] = [];
  constructor(private element: ElementRef){

  }

  ngAfterContentInit(){
    this.movables.changes.subscribe(() => {
      this.subscriptions.forEach(s => s.unsubscribe());

      this.movables.forEach(movable => {
        this.subscriptions.push(movable.dragStart.subscribe(() => this.measureBoundaries(movable)));
        this.subscriptions.push(movable.dragMove.subscribe(() => this.mantainBoundaries(movable)));
      });
    });
    //movable item dynamially added
    this.movables.notifyOnChanges();
  }

  private mantainBoundaries(movable: MovableDirective) {
    movable.position.x = Math.max(this.boundaries.minX, movable.position.x);
    movable.position.x = Math.min(this.boundaries.maxX, movable.position.x);
    movable.position.y = Math.max(this.boundaries.minY, movable.position.y);
    movable.position.y = Math.min(this.boundaries.maxY, movable.position.y);
  }
  private measureBoundaries(movable: MovableDirective) {
    //bounding rect of this area + vound rect of movables
    const viewRect: ClientRect = this.element.nativeElement.getBoundingClientRect();
    const movableClientRect:ClientRect = movable.element.nativeElement.getBoundingClientRect();

    this.boundaries = {
      minX: viewRect.left - movableClientRect.left + movable.position.x,
      maxX: viewRect.right - movableClientRect.right + movable.position.x,
      minY: viewRect.top - movableClientRect.top + movable.position.y,
      maxY: viewRect.bottom - movableClientRect.bottom + movable.position.y,
    };

  }
}
