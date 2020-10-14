import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders():leader[]{
    return LEADERS;
  }
  getFeaturedLeaders(): leader {
    return LEADERS.filter((leader) => leader.featured)[0];
  }
}
