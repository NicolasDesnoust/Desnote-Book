import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { isScullyRunning } from '@scullyio/ng-lib';
import * as screenfull from 'screenfull';
import { Theme } from 'src/app/core/model/theme';
import { ThemeHandler } from 'src/app/core/services/startup/theme-handler.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() showToggleSidenav = false;
  @Input() showBranding = true;
  @Input() showFullSearchBar = true;
  @Input() showFullLogin = true;
  @Input() isTransparent = false;
  @Input() color;
  @Output() toggleSidenav = new EventEmitter<void>();
  theme: Theme = this.themeHandler.theme;
  scullyDone: boolean;
  config = {
    indexName: 'notes',
    searchClient: environment.searchClient,
  };
  showSearchBar = false;

  constructor(private themeHandler: ThemeHandler, private router: Router) {
    this.scullyDone = !isScullyRunning();
  }

  onShowSearchBar() {
    this.showSearchBar = true;
  }
  onCloseSearchBar() {
    this.showSearchBar = false;
  }

  navigateToNotePage(option: any) {
    this.router.navigate([option.route]);
  }

  switchTheme(): void {
    this.themeHandler.updateTheme(
      this.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );

    this.theme = this.themeHandler.theme;
  }

  private get screenfull(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }

  toggleFullscreen() {
    if (this.screenfull.isEnabled) {
      this.screenfull.toggle();
    }
  }
}
