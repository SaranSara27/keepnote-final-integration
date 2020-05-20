import { Category } from './category';
import { Reminder } from './reminder';
export class Note {
  noteId: Number;
  noteTitle: string;
  noteContent: string;
  noteStatus: string;
  noteCreatedBy: string;
  category: Category;
  reminders: Array<Reminder>;
}