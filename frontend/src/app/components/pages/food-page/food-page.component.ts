import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    RouterLink,
    StarRatingComponent,
  ],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css',
  providers: [FoodService],
})
export class FoodPageComponent {
  food!: Food;

  constructor(activatedRoute: ActivatedRoute, foodService: FoodService) {
    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.food = foodService.getFoodById(params['id']);
      }
    });
  }

  addToCart() {
    // this.cartService.addToCart(this.food);
    // this.router.navigateByUrl('/cart-page');
  }
}
