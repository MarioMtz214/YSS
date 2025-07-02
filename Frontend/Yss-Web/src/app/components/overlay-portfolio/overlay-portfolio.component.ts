import { Component, EventEmitter, Output, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-overlay-portfolio',
  standalone: true,
  templateUrl: './overlay-portfolio.component.html',
  styleUrls: ['./overlay-portfolio.component.css']
})
export class OverlayPortfolioComponent implements AfterViewInit {

  @Output() close = new EventEmitter<void>(); 

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    const container = this.elRef.nativeElement.querySelector('#scrollContainer');
    if (container) {
      container.addEventListener('wheel', (evt: WheelEvent) => {
        if (evt.deltaY !== 0) {
          evt.preventDefault();
          container.scrollLeft += evt.deltaY;
        }
      }, { passive: false });
    }
  }

  emitClose(): void {
    this.close.emit();
  }
}