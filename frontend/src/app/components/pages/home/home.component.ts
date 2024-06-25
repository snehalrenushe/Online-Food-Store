import { CUSTOM_ELEMENTS_SCHEMA, Component, forwardRef } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { Observable } from 'rxjs';

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
    TagsComponent,
    NotFoundComponent,
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
    let foodsObservalbe: Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        foodsObservalbe = this.foodService.getAllFoodsBySearchTerm(
          params.searchTerm
        );
      } else if (params.tag) {
        foodsObservalbe = this.foodService.getAllFoodsByTag(params.tag);
      } else {
        foodsObservalbe = foodService.getAll();
      }
      foodsObservalbe.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    });
  }

  ngOnInit(): void {}
}
