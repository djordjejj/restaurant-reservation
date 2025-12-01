import { Injectable, BadRequestException } from '@nestjs/common';
import { Reservation } from './reservation.schema';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class ReservationService {
  private reservations = new Map<string, Reservation>();

  constructor(private readonly restaurantService: RestaurantService) {}

  private isTimeWithinRange(time: Date, open: string, close: string): boolean {
    const [openH, openM] = open.split(':').map(Number);
    const [closeH, closeM] = close.split(':').map(Number);

    const dateHour = time.getHours();
    const dateMin = time.getMinutes();

    const afterOpen = dateHour > openH || (dateHour === openH && dateMin >= openM);
    const beforeClose = dateHour < closeH || (dateHour === closeH && dateMin <= closeM);

    return afterOpen && beforeClose;
  }

  createReservation(restaurantId: string, date: Date, guestName: string): Reservation {
    const restaurant = this.restaurantService.getRestaurant(restaurantId);
    if (!restaurant) throw new BadRequestException('Restaurant not found');

    if (!this.isTimeWithinRange(date, restaurant.openHour, restaurant.closeHour)) {
      throw new BadRequestException('Reservation outside working hours');
    }

    const r: Reservation = {
      _id: Date.now().toString(),
      restaurantId,
      date,
      guestName,
    };
    this.reservations.set(r._id, r);
    return r;
  }

  getReservationsByRestaurant(restaurantId: string): Reservation[] {
    return Array.from(this.reservations.values()).filter(
      (r) => r.restaurantId === restaurantId,
    );
  }
}
