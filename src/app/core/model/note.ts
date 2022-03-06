import { ScullyRoute } from "@scullyio/ng-lib";
import { Category } from "./category";

export interface Note {
   content: string;
   metadata: NoteMetadata;
}

export interface NoteMetadata extends ScullyRoute {
   category: Category;
   createdAt: Date;
   description: string;
   readingTime: number;
}
