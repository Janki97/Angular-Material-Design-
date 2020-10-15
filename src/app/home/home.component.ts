import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,private leaderservice:LeaderService) { }

  ngOnInit() {
    // this.dish = this.dishservice.getFeaturedDish();
    this.dishservice.getFeaturedDish().subscribe(dishes => this.dish = dishes);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
    this.leaderservice.getFeaturedLeaders().subscribe(leaders => this.leader = leaders);
    // this.promotion = this.promotionservice.getFeaturedPromotion();
    // this.leader=this.leaderservice.getFeaturedLeaders();
  }

}
