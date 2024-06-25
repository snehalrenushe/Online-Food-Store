import { Component } from '@angular/core';
import { FoodService } from '../../../services/food.service';
import { Tag } from '../../../shared/models/tag';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
})
export class TagsComponent {
  tags?: Tag[];
  constructor(foodService: FoodService) {
    foodService.getAllTags().subscribe((serverTags) => {
      this.tags = serverTags;
    });
  }
  ngOnInit(): void {}
}
