import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { Cart } from '../../../shared/models/cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/cartItem';
import { TitleComponent } from '../../partials/title/title.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    TitleComponent,
    HttpClientModule,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
  providers: [CartService],
})
export class CartPageComponent {
  cart!: Cart;

  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
      console.log(this.cart);
    });
  }

  ngOnInit(): void {}

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
}
