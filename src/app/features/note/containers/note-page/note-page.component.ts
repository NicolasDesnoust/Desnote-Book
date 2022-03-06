import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Note } from 'src/app/core/model/note';
import { TableOfContentsService } from 'src/app/core/services/table-of-contents.service';
import { LayoutService } from 'src/app/layouts/layout.service';

@Component({
  template: `
    <div class="main-content-wrapper" role="main" addCodeHeaders>
      <main class="main-content">
        <app-textual-view [note]="note"></app-textual-view>
      </main>
    </div>
    <div
      class="right-sidenav with-sub-navbar-visible"
      [ngClass]="{
        'without-sub-navbar': subNavbarVisible$ | async
      }"
    >
      <app-table-of-contents class="external-toc"></app-table-of-contents>
    </div>
  `,
  styleUrls: ['./note-page.component.scss'],
})
export class NotePageComponent implements OnInit {
  note: Note;
  subNavbarVisible$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private tocService: TableOfContentsService,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { note: Note }) => {
      this.note = data.note;
      this.tocService.updateTocContent(data.note.content);
    });

    this.subNavbarVisible$ = this.layoutService.subNavbarVisible$;
  }
}
