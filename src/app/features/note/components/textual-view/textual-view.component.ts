import { PlatformLocation } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { isScullyRunning } from '@scullyio/ng-lib';
import ClipboardJS from 'clipboard';
import { Note } from 'src/app/core/model/note';

@Component({
  selector: 'app-textual-view',
  templateUrl: './textual-view.component.html',
  styleUrls: ['./textual-view.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class TextualViewComponent implements OnInit {
  @Input() note: Note;
  isScullyRunning: boolean = isScullyRunning();
  message = 'Lien copié dans le presse-papiers';
  url: string;
  window = window;

  getEncodedUrl() {
    return window.location.href;
  }

  getEncodedNoteTitle() {
    return encodeURIComponent(this.note.metadata.title);
  }

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private platformLocation: PlatformLocation
  ) {
    const location = (this.platformLocation as any).location.toString();

    if (location.includes('#')) {
      const ind = location.indexOf('#');
      this.url = location.slice(0, ind);
    } else {
      this.url = location;
    }
  }

  ngOnInit(): void {
    const clipboard = new ClipboardJS('.btn');

    clipboard.on('success', (e) => e.clearSelection());

    clipboard.on('error', (e) => {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });
  }

  onError() {
    this.router.navigate(['/']);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-accent'],
    });
  }
}
