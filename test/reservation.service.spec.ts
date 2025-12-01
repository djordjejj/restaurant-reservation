import { ReservationService } from "src/reservation/reservation.service";
import { RestaurantService } from "src/restaurant/restaurant.service";

describe('ReservationService', () => {
  let service: ReservationService;
  let restaurantService: RestaurantService;

  beforeEach(() => {
    restaurantService = {
      getRestaurant: jest.fn((id: string) => ({
        _id: id,
        name: 'Mock Restaurant',
        openHour: '10:00',
        closeHour: '22:00',
      })),
    } as any;

    service = new ReservationService(restaurantService);
  });

  it('should create a reservation', () => {
    const date = new Date();
    const reservation = service.createReservation('rest1', date, 'John');

    expect(reservation).toBeDefined();
    expect(reservation.restaurantId).toBe('rest1');
    expect(reservation.guestName).toBe('John');
  });

  it('should return reservations for a restaurant', () => {
    const date = new Date();
    service.createReservation('rest123', date, 'John');
    service.createReservation('rest123', date, 'Jane');

    const result = service.getReservationsByRestaurant('rest123');

    expect(result).toHaveLength(2);
  });
});
