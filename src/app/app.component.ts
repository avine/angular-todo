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
  }

  onCreate() {
    if (this.title) {
      this.listService.create(this.title);
      this.title = '';
    }
  }

  onChangeStatus(event, index) {
    switch (event.type) {
      case 'done':
        this.listService.done(index, event.value);
      break;
      case 'delete':
        this.listService.delete(index);
      break;
    }
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
