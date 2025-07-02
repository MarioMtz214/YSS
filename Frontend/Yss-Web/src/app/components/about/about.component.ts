import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { OverlayPortfolioComponent } from '../overlay-portfolio/overlay-portfolio.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NavBarComponent, OverlayPortfolioComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {
  showOverlay = false; // NUEVO

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const section = this.el.nativeElement.querySelector('#section2');
    const image = this.el.nativeElement.querySelector('#yssImgSize');
  }

  toggleOverlay(): void {
    this.showOverlay = !this.showOverlay;

    if (this.showOverlay) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

  closeOverlay(): void {
    this.showOverlay = false;
    document.body.classList.remove('overflow-hidden');
  }
}
