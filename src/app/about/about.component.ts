import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leaders: leader[];
  constructor(private leaderservice:LeaderService) { }

  ngOnInit(): void {

    this.leaderservice.getLeaders().subscribe(leader =>{
      this.leaders=leader;
    });
  }

}
