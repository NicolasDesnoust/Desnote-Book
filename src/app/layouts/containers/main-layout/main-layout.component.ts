import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { isScullyRunning } from '@scullyio/ng-lib';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/core/model/category';
import { CategoryService } from 'src/app/core/services/category.service';
import {
  MEDIAQUERIES,
  MOBILE_MEDIAQUERY,
  TABLET_MEDIAQUERY
} from '../../../../data/mediaqueries';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  private layoutChangesSubscription: Subscription;
  categories$: Observable<Category[]>;

  private scrolling = false;
  private lastScrollTopValue = 0;
  hideNavbar = false;
  isTabletOrBelow = false;
  isScullyRunning = isScullyRunning();

  constructor(
    private categoryService: CategoryService,
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.categories$ = this.categoryService.categories$;
  }

  ngOnInit(): void {
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([...MEDIAQUERIES])
      .subscribe((state) => {
        this.isTabletOrBelow =
          state.breakpoints[MOBILE_MEDIAQUERY] ||
          state.breakpoints[TABLET_MEDIAQUERY];
      });
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  @HostListener('document:scroll')
  public onScroll() {
    const scrollPosition: number =
      this.document.documentElement.scrollTop || this.document.body.scrollTop;
    this.autoHideHeader(scrollPosition);
  }

  autoHideHeader(scrollPosition: number) {
    if (!this.scrolling) {
      if (scrollPosition < this.lastScrollTopValue) {
        this.hideNavbar = false;
      } else if (scrollPosition > this.lastScrollTopValue) {
        this.hideNavbar = true;
      }
    }

    this.lastScrollTopValue = scrollPosition;
    this.scrolling = false;
  }
}
