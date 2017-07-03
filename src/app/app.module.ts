import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListService } from './list/list.service';
import { TodoComponent } from './todo/todo.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    ListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
