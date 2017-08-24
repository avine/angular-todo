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
  list: TodoModel[];
  subscription: Subscription;
  isLoading = true;

  constructor(private listService: TodoService) {
    this.listService.getList().subscribe(
      () => this.isLoading = false
    );
  }

  ngOnInit() {
    this.list = this.listService.get(true);
    this.subscription = this.listService.changed.subscribe(() => {
      this.list = this.listService.get(true);
    });
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  onAction(type: string, item: TodoModel) {
    switch (type) {
      case 'unarchive':
        this.listService.archive(item.id, false);
        break;

      case 'delete':
        this.listService.delete(item.id);
        break;
    }
  }
}
