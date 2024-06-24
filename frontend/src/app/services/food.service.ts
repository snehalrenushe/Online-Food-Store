import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods } from '../../data';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getAll(): Food[] {
    return sample_foods;
  }
}
