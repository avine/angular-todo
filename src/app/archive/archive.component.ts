import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ListService } from '../list/list.service';
import { ListItemModel} from '../list/listItem.model';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit, OnDestroy {
  list: ListItemModel[];
  subscription: Subscription;

  constructor(private listService: ListService) {
    this.listService = listService;
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

  onAction(type: string, item: ListItemModel) {
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
