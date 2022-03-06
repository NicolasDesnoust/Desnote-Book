import { NoteMetadata } from "./note";

export class Category {
  id: string;
  label: string;
  description: string;
  notesMetadata: NoteMetadata[];
}
