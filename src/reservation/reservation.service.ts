import { Injectable, BadRequestException } from '@nestjs/common';
import { Reservation } from './reservation.schema';
import { RestaurantService } from 'src/restaurant/restaurant.service';

@Injectable()
export class ReservationService {
  private reservations: Reservation[] = [];

  constructor(private readonly restaurantService: RestaurantService) {}

  createReservation(restaurantId: string, date: Date, guestName: string): Reservation {
    const restaurant = this.restaurantService.getRestaurant(restaurantId);
    if (!restaurant) {
        throw new BadRequestException('Restaurant not found');
    }

    if (!this.isTimeWithinRange(date, restaurant.openHour, restaurant.closeHour)) {
      throw new BadRequestException('Reservation outside working hours');
    }

    const reservation: Reservation = {
      _id: Date.now().toString(),
      restaurantId,
      guestName,
      date,
    };

    this.reservations.push(reservation);

    return reservation;
  }

  getReservationsByRestaurant(restaurantId: string): Reservation[] {
    return this.reservations.filter(r => r.restaurantId === restaurantId);
  }

  private isTimeWithinRange(date: Date, open: string, close: string): boolean {
    const [openH, openM] = open.split(':').map(Number);
    const [closeH, closeM] = close.split(':').map(Number);

    const time = date.getHours() * 60 + date.getMinutes();
    const openTime = openH * 60 + openM;
    const closeTime = closeH * 60 + closeM;

    return time >= openTime && time <= closeTime;
  }
}
