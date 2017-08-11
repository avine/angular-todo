import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  tabId: string;

  @Input() tabDefault: string;
  @Output() tabChanged: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.tabId = this.tabDefault;
  }

  onChange(tabId: string) {
    this.tabId = tabId;
    this.tabChanged.emit(this.tabId);
  }
}
