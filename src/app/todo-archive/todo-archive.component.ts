import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TodoService } from '../todo/todo.service';
import { TodoModel } from '../todo/todo.model';

@Component({
  selector: 'app-todo-archive',
  templateUrl: './todo-archive.component.html',
  styleUrls: ['./todo-archive.component.css']
})
export class TodoArchiveComponent implements OnInit, OnDestroy {
  list: TodoModel[] = [];
  subscription: Subscription;
  isLoading = true;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.subscription = this.todoService.getList().subscribe(() => {
      this.isLoading = false;
      this.list = this.todoService.get(true);
    });
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  onAction(type: string, item: TodoModel) {
    switch (type) {
      case 'unarchive':
        this.todoService.archive(item.id, false);
        break;

      case 'delete':
        this.todoService.delete(item.id);
        break;
    }
  }
}
