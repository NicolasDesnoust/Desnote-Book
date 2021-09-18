import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Theme } from '../../model/theme';
import { toEnum } from '../../util/enum-utils';
import { BaseStartupService } from './base-startup.service';
import { Logger } from './logger.service';

/**
 * Service responsable des thèmes de l'application.
 */
@Injectable()
export class ThemeHandler extends BaseStartupService {
  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject(null);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private logger: Logger
  ) {
    super();
  }

  get theme() {
    return this.themeSubject.value;
  }
  get theme$() {
    return this.themeSubject.asObservable();
  }

  /**
   * Applique le thème sauvegardé dans le LocalStorage ou applique
   * celui par défaut au démarrage de l'application.
   */
  load(): Observable<void> {
    const savedTheme = localStorage.getItem('theme');
    const themeToApply = toEnum(Theme, savedTheme, Theme.LIGHT);
    this.logger.info(`Using ${themeToApply} theme`);
    this.updateTheme(themeToApply);

    return of(null);
  }

  /**
   * Met à jour le thème de l'application.
   */
  updateTheme(theme: Theme) {
    if (theme !== this.theme) {
      const oldTheme = this.themeSubject.value;
      this.themeSubject.next(theme);

      const htmlClassList = this.document.querySelector('html').classList;
      const removeClassList = /\w{0,5}-theme\b/.exec(htmlClassList.value);
      if (removeClassList) {
        htmlClassList.remove(...removeClassList);
      }
      this.logger.info(`Updating theme: ${oldTheme} -> ${theme}`);
      htmlClassList.add(`${theme}-theme`);
      localStorage.setItem('theme', theme);
    }
  }
}
