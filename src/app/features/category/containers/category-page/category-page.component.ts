import { DatePipe } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Category } from 'src/app/core/model/category';
import { NoteMetadata } from 'src/app/core/model/note';
import { CategoryService } from 'src/app/core/services/category.service';
import { CardItem } from 'src/app/shared/model/card-item';

@Component({
  selector: 'app-category-page',
  template: `
    <ng-container *ngIf="category$ | async as category">
      <div class="category-page">
        <app-page-header
          [title]="category.label"
          [description]="category.description"
        ></app-page-header>

        <main
          *ngIf="items$ | async as items"
          class="container-md category-page-content"
        >
          <app-card-list [items]="items" title="Notes récentes"></app-card-list>
        </main>
      </div>
    </ng-container>
  `,
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent {
  category$: Observable<Category>;
  items$: Observable<CardItem[]>;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.category$ = this.route.paramMap.pipe(
      switchMap((params) => this.categoryService.findCategory(params.get('id')))
    );
    this.items$ = this.category$.pipe(
      map((category) =>
        this.toCardItems(
          category.notesMetadata.sort((a, b) => {
            return b.createdAt.getTime() - a.createdAt.getTime();
          })
        )
      )
    );
  }

  private toCardItems(notesMetadata: NoteMetadata[]): CardItem[] {
    return notesMetadata.map((noteMetadata) => ({
      title: noteMetadata.title,
      body: noteMetadata.description,
      header: this.datePipe.transform(
        noteMetadata.createdAt.toISOString(),
        'longDate',
        this.locale
      ),
      route: noteMetadata.route,
    }));
  }
}
