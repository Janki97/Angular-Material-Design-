import { Component, OnInit } from '@angular/core';
import {  Params ,ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    // this.dish = this.dishservice.getDish(id);
    this.dishservice.getDish(id).subscribe(dishes => this.dish = dishes);
  }

  goBack(): void {
    this.location.back();
  }

}
