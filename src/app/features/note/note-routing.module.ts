import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotePageComponent } from './containers/note-page/note-page.component';
import { NoteResolver } from './services/note.resolver';


const routes: Routes = [
  {
    path: ':slug',
    component: NotePageComponent,
    resolve: { note: NoteResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteRoutingModule {}
