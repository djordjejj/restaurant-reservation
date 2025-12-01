import { Injectable } from '@nestjs/common';
import { Restaurant } from './restaurant.schema';

@Injectable()
export class RestaurantService {
  private restaurants = new Map<string, Restaurant>();

  constructor() {
    // Seed data
    this.restaurants.set('1', {
      _id: '1',
      name: 'Test Restaurant',
      openHour: '10:00',
      closeHour: '22:00',
    });
  }

  getRestaurant(id: string): Restaurant | undefined {
    return this.restaurants.get(id);
  }

  getAll(): Restaurant[] {
    return Array.from(this.restaurants.values());
  }
}
