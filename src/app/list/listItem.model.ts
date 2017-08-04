export class ListItemModel {
  title: string;
  done: boolean;
  archived: boolean;
  id: number;

  static fromJson(o: {title: string, done: boolean, archived: boolean, id: number}) {
    return new ListItemModel(o.title, o.done, o.archived, o.id);
  }

  constructor(title: string, done = false, archived = false, id: number = new Date().getTime()) {
    this.title = title;
    this.done = done;
    this.archived = archived;
    this.id = id;
  }
}
