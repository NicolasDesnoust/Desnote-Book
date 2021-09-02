import {
  Directive,
  ElementRef,
  Injector,
  ApplicationRef,
  ComponentFactoryResolver,
  Inject,
  HostListener,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLinkComponent } from '../components/router-link.component';

@Directive({
  selector: '[testDir]',
})
export class ConvertLinksDirective {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private element: ElementRef<HTMLElement>
  ) {}

  @HostListener('ready')
  public processAnchors() {
    this.element.nativeElement
      .querySelectorAll('a[routerLink]')
      .forEach((a) => {
        const parent = a.parentElement;
        if (parent) {
          const container = this.document.createElement('span');
          container.classList.add('btn-wrapper');
          const component = this.componentFactoryResolver
            .resolveComponentFactory(RouterLinkComponent)
            .create(this.injector, [], container);
          this.applicationRef.attachView(component.hostView);
          component.instance.href = a.getAttribute('routerLink') || '';
          parent.replaceChild(container, a);
        }
      });
  }
}
