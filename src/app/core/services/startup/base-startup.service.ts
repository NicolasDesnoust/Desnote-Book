import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseStartupService {
  protected _loaded = false;

  constructor() {
    console.log(`constructing ${this.constructor.name} ...`);
  }

  protected abstract load(): Observable<void>;

  /**
   * Méthode à appeler lors du démarrage de l'application
   * à l'aide du jeton DI APP_INITIALIZER.
   *
   * Protège d'un second appel à la méthode load().
   */
  loadOnStartup(): Observable<void> {
    if (this._loaded) {
      console.log(`${this.constructor.name} already loaded`);
      throw new Error(`${this.constructor.name} has already been loaded.`);
    } else {
      console.log(`loading ${this.constructor.name} ...`);
      this._loaded = true;
      return this.load();
    }
  }
}
