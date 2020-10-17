import { Component, Inject, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animation';
import { LeaderService } from '../services/leader.service';
import { leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {
  leaders: leader[];
  derrMess: string;
  constructor(private leaderservice:LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit(): void {

    this.leaderservice.getLeaders().subscribe(leader =>{
      this.leaders=leader;
      errmess => this.derrMess = <any>errmess;
    });
  }

}
