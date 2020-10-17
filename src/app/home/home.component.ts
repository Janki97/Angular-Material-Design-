import { Component, Inject, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animation';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: leader;
  derrMess: string;
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,private leaderservice:LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    // this.dish = this.dishservice.getFeaturedDish();
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,errmess => this.derrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,errmess => this.derrMess = <any>errmess);
    this.leaderservice.getFeaturedLeaders().subscribe(leaders => this.leader = leaders,errmess => this.derrMess = <any>errmess);
    // this.promotion = this.promotionservice.getFeaturedPromotion();
    // this.leader=this.leaderservice.getFeaturedLeaders();
  }

}
