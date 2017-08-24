import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';

import { TodoService } from '../../todo/todo.service';
import { TodoModel } from '../../todo/todo.model';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit, AfterViewInit, AfterViewChecked {
  title: string;
  filter: string;
  role = 'add';
  private _roleSwitched = false;
  @ViewChild('titleInput') titleInput;
  @ViewChild('filterInput') filterInput;
  @Output() filtered: EventEmitter<any> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.autofocus();
  }

  ngAfterViewChecked() {
    if (this._roleSwitched) {
      this._roleSwitched = false;
      this.autofocus();
    }
  }

  onCreate() {
    if (this.role === 'add' && this.title) {
      if (this.todoService.create(this.title)) {
        this.title = '';
      } else {
        console.log('Duplicate title...'); // TODO: improve this...
      }
    }
  }

  onFilter() {
    this.filtered.emit(this.filter);
  }

  onSwitchRole() {
    this.role = this.role === 'add' ? 'filter' : 'add';
    this._roleSwitched = true;
    this.title = '';
    this.filter = '';
    this.filtered.emit('');
  }

  autofocus() {
    try {
      if (this.role === 'add') {
        this.titleInput.nativeElement.focus();
      } else {
        this.filterInput.nativeElement.focus();
      }
    } catch (e) {}
  }
}
