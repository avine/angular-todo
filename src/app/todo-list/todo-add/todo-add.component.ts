import {
  Component,
  AfterViewInit,
  AfterViewChecked,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { TodoService } from '../../todo/todo.service';
import { TodoModel } from '../../todo/todo.model';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements AfterViewInit, AfterViewChecked {
  role = 'add';
  private _roleSwitched = false;
  @ViewChild('titleInput') titleInput: ElementRef;
  @ViewChild('filterInput') filterInput: ElementRef;

  // TODO: use the list property to validate automatically
  // the title input using form validation...
  @Input() list: TodoModel[] = [];

  @Output() filtered: EventEmitter<any> = new EventEmitter();

  constructor(private todoService: TodoService) {
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

  onCreate(form: NgForm) {
    const title = form.controls.title.value;
    if (this.role === 'add' && title) {
      // The `.create` method returns `false` in case of failure.
      // To enable realtime validation, use `@Input() list` and validation directive...
      if (this.todoService.create(title)) {
        form.reset();
      } else {
        // This will set the `form.valid` property to `false`
        form.control.setErrors({ 'title': 'duplicate' });
      }
    }
  }

  onFilter(filterModel: NgModel) {
    this.filtered.emit(filterModel.value);
  }

  onSwitchRole() {
    this.role = this.role === 'add' ? 'filter' : 'add';
    this._roleSwitched = true;
    this.filtered.emit('');
  }

  autofocus() {
    const input = this.role === 'add' ? this.titleInput : this.filterInput;
    try { input.nativeElement.focus(); } catch (e) {}
  }
}
