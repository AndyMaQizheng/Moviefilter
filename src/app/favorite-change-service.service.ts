import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteChangeServiceService {

  subject = new Subject();
  favoriteIds: Set<number> = new Set();

  constructor() { }

  toggleValue(id: number) {
    if(this.favoriteIds.has(id)) {
      this.favoriteIds.delete(id);
    }
    else {
      this.favoriteIds.add(id);
    }
  }

  getList() {
    return this.favoriteIds;
  }

  hasId(id: number) {
    return this.favoriteIds.has(id);
  }
}
