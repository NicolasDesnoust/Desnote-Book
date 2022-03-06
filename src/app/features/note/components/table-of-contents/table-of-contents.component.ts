import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import * as Gumshoe from 'gumshoejs';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  TableOfContentsService,
  TocHeader
} from 'src/app/core/services/table-of-contents.service';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
})
export class TableOfContentsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() limit: number;
  headers: TocHeader[];
  filteredHeaders$ = new BehaviorSubject<TocHeader[]>([]);
  expanded = false;
  currentSection$: Observable<string>;

  private scrollSpy: Gumshoe;

  constructor(private tocService: TableOfContentsService) {}

  ngOnInit() {
    const headers$ = this.tocService.tocContent$.pipe(
      map((headers) =>
        headers.filter((header) => header.lvl === 2 || header.lvl === 3)
      ),
      tap((headers) => (this.headers = headers)),
      map((headers) => (this.limit ? headers.slice(0, this.limit) : headers))
    );

    headers$.subscribe(this.filteredHeaders$);

    this.filteredHeaders$.subscribe((a) => {
      this.setScrollSpy();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.limit) {
      this.applyLimit(this.limit);
    }
  }

  applyLimit(limit: number) {
    if (this.headers) {
      const filteredHeaders =
        limit != null ? this.headers.slice(0, this.limit) : this.headers;

      this.expanded = limit == null;
      this.filteredHeaders$.next(filteredHeaders);
    }
  }

  ngOnDestroy(): void {
    this.destroyScrollSpy();
  }

  destroyScrollSpy(): void {
    if (this.scrollSpy) {
      this.scrollSpy.destroy();
    }
  }

  setScrollSpy(): void {
    if (this.scrollSpy) {
      this.scrollSpy.setup();
      this.scrollSpy.detect();
    }
  }
}
