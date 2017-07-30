import { Component, OnInit } from '@angular/core';

import { ListService } from '../list/list.service';
import { ListItemModel} from '../list/listItem.model';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  list: ListItemModel[];

  constructor(private listService: ListService) {
    this.list = listService.get(true);
  }

  ngOnInit() {
  }

}
