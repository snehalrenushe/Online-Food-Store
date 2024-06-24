import { CUSTOM_ELEMENTS_SCHEMA, Component, forwardRef } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from '../../partials/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    StarRatingComponent,
    HttpClientModule,
    SearchComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [FoodService],
})
export class HomeComponent {
  foods: Food[] = [];

  constructor(
    private foodService: FoodService,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.foods = this.foodService.getAllFoodBySearchTerm(
          params['searchTerm']
        );
      } else {
        this.foods = foodService.getAll();
      }
    });
  }

  ngOnInit() {}
}
