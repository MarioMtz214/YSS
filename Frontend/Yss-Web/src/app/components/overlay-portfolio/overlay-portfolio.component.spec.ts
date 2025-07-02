import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayPortfolioComponent } from './overlay-portfolio.component';

describe('OverlayPortfolioComponent', () => {
  let component: OverlayPortfolioComponent;
  let fixture: ComponentFixture<OverlayPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayPortfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
