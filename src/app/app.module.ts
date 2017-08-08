import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ListService } from './list/list.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TodoComponent } from './todo/todo.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';
import { ArchiveComponent } from './archive/archive.component';

const routes = [
  { path: 'todo', component: TodoComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: '**', redirectTo: '/todo' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoComponent,
    TodoItemComponent,
    ArchiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    Title,
    ListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
