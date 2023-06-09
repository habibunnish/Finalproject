import { CartDetailsService } from './service/cart-details.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private cart: CartDetailsService
  ) {}

  totalItem: any;

  ngOnInit() {
    this.cart.getProducts().subscribe((res) => {
      this.totalItem = res;
      console.log(res);
    });
  }

  hotel() {
    console.log('helppage');
    this.router.navigate(['booking-page']);
  }

  get loggedIn() {
    return sessionStorage.getItem('UsertToken');
  }

  onLogout() {
    sessionStorage.removeItem('UsertToken');
    sessionStorage.removeItem('adminToken');
  }

  bookDetailsNew() {
    this.router.navigate(['main-page']);
  }

  home() {
    this.router.navigate(['home-page']);
  }

  query() {
    this.router.navigate(['how-it-work']);
  }
  goToAddNewPage() {
    this.router.navigate(['add-new-data/' + 'addHotel']);
  }
  userBooked() {
    this.router.navigate(['user-booked-details']);
  }

  get adminLoggedIn() {
    return sessionStorage.getItem('adminToken');
  }

  onadminlogout() {
    sessionStorage.removeItem('adminToken');
  }
}
