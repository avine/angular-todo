import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { ListService } from './list/list.service'; // TODO: rename into something else...
import { BackendService } from './list/backend.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TabsComponent } from './tabs/tabs.component';
import { TodoComponent } from './todo/todo.component'; // TODO: rename into ListComponent
import { TodoAddComponent } from './todo/todo-add/todo-add.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';
import { ArchiveComponent } from './archive/archive.component';

import { FilterPipe } from './filter.pipe';
import { SortPipe } from './sort.pipe';

const routes = [
  { path: 'todo/:tabId', component: TodoComponent }, // TODO: check the list of expected routes 'all', 'left', 'done'
  { path: 'archive', component: ArchiveComponent },
  { path: '**', redirectTo: '/todo/all' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabsComponent,
    TodoComponent,
    TodoAddComponent,
    TodoItemComponent,
    ArchiveComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    Title,
    ListService,
    BackendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
