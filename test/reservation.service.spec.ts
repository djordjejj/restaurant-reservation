import { ReservationService } from 'src/reservation/reservation.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { Restaurant } from 'src/restaurant/restaurant.schema';

describe('ReservationService', () => {
  let service: ReservationService;
  let restaurantService: RestaurantService;

  beforeEach(() => {
    restaurantService = {
      getRestaurant: jest.fn().mockImplementation((id: string) => {
        const r = new Restaurant();
        r._id = id;
        r.name = 'Test R';
        r.openHour = '00:00';
        r.closeHour = '23:59';
        return r;
      })
    } as any;

    service = new ReservationService(restaurantService);
  });

  it('should create a reservation', () => {
    const date = new Date('2024-01-01T12:00:00Z'); 
    const reservation = service.createReservation('rest1', date, 'John');

    expect(reservation).toBeDefined();
    expect(reservation.restaurantId).toBe('rest1');
    expect(reservation.guestName).toBe('John');
  });

  it('should return reservations for a restaurant', () => {
    const date = new Date('2024-01-01T12:00:00Z');

    service.createReservation('rest123', date, 'John');
    service.createReservation('rest123', date, 'Jane');

    const all = service.getReservationsByRestaurant('rest123');

    expect(all.map(r => r.guestName)).toContain('John');
    expect(all.map(r => r.guestName)).toContain('Jane');
    expect(all.length).toBe(2);
  });
});
