import { DatePipe } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/core/model/category';
import { NoteMetadata } from 'src/app/core/model/note';
import { CategoryService } from 'src/app/core/services/category.service';
import { NoteService } from 'src/app/core/services/note.service';
import { CardItem } from 'src/app/shared/model/card-item';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  items$: Observable<CardItem[]>;
  categories$: Observable<Category[]>;

  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService,
    private datePipe: DatePipe,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.fetchCardItems();
    this.fetchCategories();
  }

  private fetchCategories() {
    this.categories$ = this.categoryService.categories$;
  }

  private fetchCardItems() {
    this.items$ = this.noteService.availableNotesMetadata$.pipe(
      map((notesMetadata) => {
        notesMetadata.sort((a, b) => {
          return b.createdAt.getTime() - a.createdAt.getTime();
        });

        return this.toCardItems(notesMetadata);
      })
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
      footer: noteMetadata.category.label,
      route: noteMetadata.route,
    }));
  }
}
