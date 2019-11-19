import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  selectedItem: Item;
  items: Item[];

  constructor(private http: HttpClient) { }
  postItem(item: Item){
    var headers= new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/item',item);
  }

  getItems(){
    return this.http.get('http://localhost:3000/items')
  }

  putItem(item: Item){
    return this.http.put('http://localhost:3000/item/_id',item);
  }

  deleteItem(_id: string){
    return this.http.delete('http://localhost:3000/item/_id')
  }
}
