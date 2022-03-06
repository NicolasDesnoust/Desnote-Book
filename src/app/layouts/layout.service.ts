import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private subNavBarVisibleSubject = new BehaviorSubject(false);

  get subNavbarVisible$() {
    return this.subNavBarVisibleSubject.asObservable();
  }

  updateSubNavbarVisibility(subNavBarVisible: boolean) {
    this.subNavBarVisibleSubject.next(subNavBarVisible);
  }
}
