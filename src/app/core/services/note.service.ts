import { Injectable } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NoteMetadata } from '../model/note';
import { isANote, keepNotesOnly as keepOnlyNotes } from '../util/note-utils';
import { CategoryService } from './category.service';
import { NoteAdapterService } from './note-adapter.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(
    private scully: ScullyRoutesService,
    private noteAdapter: NoteAdapterService,
    private categoryService: CategoryService
  ) {}

  get availableNotesMetadata$(): Observable<NoteMetadata[]> {
    return this.scully.available$.pipe(
      map((scullyRoutes) => keepOnlyNotes(scullyRoutes)),
      map((rawNotesMetadata) =>
        this.noteAdapter.toNotesMetadata(
          rawNotesMetadata,
          this.categoryService.categories
        )
      )
    );
  }

  get allNotesMetadata$(): Observable<NoteMetadata[]> {
    return this.scully.allRoutes$.pipe(
      map((scullyRoutes) => keepOnlyNotes(scullyRoutes)),
      map((rawNotesMetadata) =>
        this.noteAdapter.toNotesMetadata(
          rawNotesMetadata,
          this.categoryService.categories
        )
      )
    );
  }

  getNoteMetadata$(slug: string): Observable<NoteMetadata> {
    return this.scully.available$.pipe(
      map((availableRoutes) =>
        availableRoutes.find((r) =>
          this.basePathOnly(r.route.trim()).endsWith(slug)
        )
      ),
      filter((scullyRoute) => isANote(scullyRoute)),
      map((rawNoteMetadata) =>
        this.noteAdapter.toNoteMetadata(
          rawNoteMetadata,
          this.categoryService.categories
        )
      )
    );
  }

  private basePathOnly = (str: string): string => {
    if (str.includes('#')) {
      str = str.split('#')[0];
    }
    if (str.includes('?')) {
      str = str.split('?')[0];
    }
    const cleanedUpVersion = str.endsWith('/') ? str.slice(0, -1) : str;
    return cleanedUpVersion;
  };
}
