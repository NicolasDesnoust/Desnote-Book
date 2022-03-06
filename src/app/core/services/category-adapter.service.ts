import { Injectable } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Category } from '../model/category';
import { NoteAdapterService } from './note-adapter.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryAdapterService {
  constructor(private noteAdapter: NoteAdapterService) {}

  toCategories(rawCategories: any[], scullyRoutes: ScullyRoute[]): Category[] {
    const categories: Category[] = rawCategories;

    scullyRoutes.forEach((scullyRoute) => {
      const category = categories.find(
        (currentCategory) => currentCategory.id === scullyRoute.category
      );

      if (!category) {
        console.error(
          `Category not found for : ${JSON.stringify(scullyRoute)}`
        );
      } else {
        category.notesMetadata.push(this.noteAdapter.toNoteMetadata(scullyRoute, categories));
      }
    });

    return categories;
  }
}
