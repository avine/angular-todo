export class TodoModel {
  title: string;
  done: boolean;
  archived: boolean;
  id: number;

  static fromJson(o: {title: string, done: boolean, archived: boolean, id: number}) {
    return new TodoModel(o.title, o.done, o.archived, o.id);
  }

  static getId() {
    return new Date().getTime();
  }

  constructor(title: string, done = false, archived = false, id: number = TodoModel.getId()) {
    this.title = title;
    this.done = done;
    this.archived = archived;
    this.id = id;
  }
}
