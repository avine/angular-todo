import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map'; // Just import map
// import { Operator } from 'rxjs/Rx'; // Or import all operators

import { ListItemModel } from './listItem.model';

@Injectable()
export class BackendService {
  url: string;

  constructor(private http: Http) {
    this.url = environment.backendUrl;
  }

  fetchList() {
    console.log('fetchList');
    return this.http.get(this.url).map((response: Response) => {
      console.log(response.json());
      return response.json();
    });
  }

  saveList(list: ListItemModel[]) {
    console.log('saveList');
    return this.http.put(this.url, list);
  }
}
