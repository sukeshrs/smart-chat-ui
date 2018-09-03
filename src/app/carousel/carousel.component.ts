import { Component, ContentChildren, Directive, ElementRef, Input, QueryList, TemplateRef } from '@angular/core';
import { AfterViewInit, OnChanges, ViewChild, ViewChildren, SimpleChanges} from '@angular/core';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
import { CarouselItemDirective } from './carousel-item.directive';
import { CarouselItemElement } from './carousel-item-element.directive';

@Component({
  selector: 'carousel',
  exportAs: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnChanges, AfterViewInit {

  @ContentChildren(CarouselItemDirective) items : QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselItemElement, { read: ElementRef }) private itemsElements : QueryList<ElementRef>;
  @ViewChild('carousel') private carousel : ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  @Input() itemsLength: number;

  private player : AnimationPlayer;
  private itemWidth : number;
  private currentSlide = 0;
  carouselWrapperStyle = {}
  carouselItemStyle = {}

  next() {
    this.itemWidth=this.itemsElements.first.nativeElement.getBoundingClientRect().width;
    if( this.currentSlide + 1 === this.items.length ) return;
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    const offset = this.currentSlide * (this.itemWidth);
    const myAnimation : AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
    console.log("next items.length: " +  this.items.length)
  }

  private buildAnimation( offset ) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
  }

  prev() {
    this.itemWidth=this.itemsElements.first.nativeElement.getBoundingClientRect().width;
    if( this.currentSlide === 0 ) return;

    this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;

    const myAnimation : AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
    console.log("prev items.length: " +  this.items.length)
  }

  constructor( private builder : AnimationBuilder ) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log("ngAfterViewInit");
      this.updateItems();
    });

  }

  ngOnChanges(changes: SimpleChanges){
      console.log("ngOnChanges");
      this.updateItems();

  }

  updateItems(){
    //TODO
    if(this.itemsElements){
      this.carouselWrapperStyle = {
        width: `${this.itemsLength * 100}%`
      }
    }

  }

}
