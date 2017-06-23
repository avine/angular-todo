import { Component } from '@angular/core';
import { ListService } from './list/list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listService: ListService;
  title: string;

  constructor(listService: ListService) {
    this.listService = listService;
    console.log(this);
  }

  onSubmit(fields) {
    if (this.title) {
      this.listService.create(this.title);
      this.title = '';
    }
  }

  onDelete(index) {
    this.listService.delete(index);
  }

  onUpdateDone(index, checked) {
    this.listService.list[index].done = checked;
  }

  remain(): number {
    let count = 0;
    this.listService.list.forEach(function (item) {
      if (!item.done) {
        count++;
      }
    });
    return count;
  }
}
