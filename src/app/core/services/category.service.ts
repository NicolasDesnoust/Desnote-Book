import { Injectable } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { categories } from '../data/categories';
import { Category } from '../model/category';
import { keepNotesOnly } from '../util/note-utils';
import { CategoryAdapterService } from './category-adapter.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<Category[]>(categories);

  constructor(
    private scully: ScullyRoutesService,
    private categoryAdapter: CategoryAdapterService
  ) {
    this.scully.available$
      .pipe(
        map((scullyRoutes) => keepNotesOnly(scullyRoutes)),
        map((noteRoutes) =>
          this.categoryAdapter.toCategories(this.categories, noteRoutes)
        ),
        map((allCategories) => this.filterEmptyCategories(allCategories))
      )
      .subscribe((nonEmptyCategories) =>
        this.categoriesSubject.next(nonEmptyCategories)
      );
  }

  private filterEmptyCategories(categoriesToFilter: Category[]): Category[] {
    return categoriesToFilter.filter(
      (category) => category.notesMetadata.length > 0
    );
  }

  get categories$() {
    return this.categoriesSubject.asObservable();
  }
  get categories() {
    return this.categoriesSubject.value;
  }

  findCategory(id: string) {
    return this.categories$.pipe(
      map((allCategories) =>
        allCategories.find((category) => category.id === id)
      )
    );
  }
}
