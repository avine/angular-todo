import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { AuthService } from './data/auth.service';
import { AuthGuardService } from './auth-guard.service';
import { DatabaseService } from './data/database.service';
import { TodoService } from './todo/todo.service';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { TabsComponent } from './tabs/tabs.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoAddComponent } from './todo-list/todo-add/todo-add.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { TodoArchiveComponent } from './todo-archive/todo-archive.component';

import { FilterPipe } from './filter.pipe';
import { SortPipe } from './sort.pipe';

const routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'todo/:tabId', component: TodoListComponent, canActivate: [AuthGuardService] },
  { path: 'archive', component: TodoArchiveComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '/todo/all' }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    TabsComponent,
    TodoListComponent,
    TodoAddComponent,
    TodoItemComponent,
    TodoArchiveComponent,
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
    AuthService,
    AuthGuardService,
    DatabaseService,
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
