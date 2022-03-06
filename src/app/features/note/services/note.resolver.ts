import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Note } from 'src/app/core/model/note';
import { NoteService } from 'src/app/core/services/note.service';

@Injectable({
  providedIn: 'root',
})
export class NoteResolver implements Resolve<Note> {
  constructor(private http: HttpClient, private noteService: NoteService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const noteContent$ = this.http.get(
      `assets/notes/${route.params['slug']}.md`,
      {
        responseType: 'text',
      }
    );

    const noteMetadata$ = this.noteService
      .getNoteMetadata$(route.params['slug'])
      .pipe(take(1));

    return forkJoin([noteContent$, noteMetadata$]).pipe(
      map((result) => ({
        content: result[0],
        metadata: result[1],
      }))
    );
  }
}
