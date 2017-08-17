import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ListService } from '../list/list.service';
import { ListItemModel } from '../list/listItem.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  list: ListItemModel[];
  subscription: Subscription;
  tabId = 'all';
  filtered: string;
  isLoading = true;

  constructor(private listService: ListService,
              private router: Router,
              private route: ActivatedRoute) {
    this.listService.getList().subscribe(
      () => this.isLoading = false
    );
  }

  ngOnInit() {
    this.getList();
    this.subscription = this.listService.changed.subscribe(() => this.getList());
    this.route.params.subscribe((params: Params) => this.tabId = params.tabId); // TODO check params.tabId
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  getList() {
    this.list = this.listService.get(false, this.tabId);
  }

  onTabChanged(tabId) {
    this.tabId = tabId;
    this.getList();
    this.router.navigate(['/todo/', tabId]);
  }

  onStatusChanged(id, event) {
    switch (event.type) {
      case 'done':
        this.listService.done(id, event.value);
        break;

      case 'rename':
        this.listService.rename(id, event.value);
        break;

      case 'archive':
        this.listService.archive(id);
        break;
    }
  }

  remain(): number {
    let count = 0;
    this.list.forEach(function (item) {
      if (!item.done) {
        count++;
      }
    });
    return count;
  }

  remainBadge() {
    const remain = this.remain() / this.list.length;
    let badgeColor;
    if (remain >= 0.75) {
      badgeColor = 'danger';
    } else if (remain >= 0.5) {
      badgeColor = 'warning';
    } else if (remain >= 0.25) {
      badgeColor = 'info';
    } else {
      badgeColor = 'success';
    }
    return `badge-${badgeColor}`;
  }
}
