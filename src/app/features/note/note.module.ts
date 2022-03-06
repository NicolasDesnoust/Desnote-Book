import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableOfContentsComponent } from './components/table-of-contents/table-of-contents.component';
import { TextualViewComponent } from './components/textual-view/textual-view.component';
import { NotePageComponent } from './containers/note-page/note-page.component';
import { NoteRoutingModule } from './note-routing.module';

@NgModule({
  declarations: [
    TextualViewComponent,
    TableOfContentsComponent,
    NotePageComponent,
  ],
  imports: [
    SharedModule,
    NoteRoutingModule,
    ScullyLibModule,
    MarkdownModule.forChild(),
  ],
})
export class NoteModule {}
