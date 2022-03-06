import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { NoteMetadata } from '../model/note';

@Injectable({
  providedIn: 'root',
})
export class NoteAdapterService {
  toNotesMetadata(
    rawNotesMetadata: any[],
    categories: Category[]
  ): NoteMetadata[] {
    return rawNotesMetadata.map((rawNoteMetadata) =>
      this.toNoteMetadata(rawNoteMetadata, categories)
    );
  }

  toNoteMetadata(rawNoteMetadata: any, categories: Category[]): NoteMetadata {
    const category = categories.find(
      (currentCategory) => currentCategory.id === rawNoteMetadata.category
    );

    return {
      ...rawNoteMetadata,
      category,
      createdAt: new Date(rawNoteMetadata.createdAt),
    };
  }
}
