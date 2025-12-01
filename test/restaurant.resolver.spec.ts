import { Test, TestingModule } from '@nestjs/testing';
import { Reservation } from 'src/reservation/reservation.schema';
import { ReservationService } from 'src/reservation/reservation.service';
import { RestaurantResolver } from 'src/restaurant/restaurant.resolver';
import { Restaurant } from 'src/restaurant/restaurant.schema';
import { RestaurantService } from 'src/restaurant/restaurant.service';

describe('RestaurantResolver', () => {
  let resolver: RestaurantResolver;
  let restaurantService: RestaurantService;
  let reservationService: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantResolver,
        {
          provide: RestaurantService,
          useValue: {
            getRestaurant: jest.fn(),
          },
        },
        {
          provide: ReservationService,
          useValue: {
            getReservationsByRestaurant: jest.fn() as jest.Mock<Promise<Reservation[]>, [string]>,
          },
        },
      ],
    }).compile();

    resolver = module.get<RestaurantResolver>(RestaurantResolver);
    restaurantService = module.get<RestaurantService>(RestaurantService);
    reservationService = module.get<ReservationService>(ReservationService);
  });

  it('should return a restaurant', async () => {
    const fakeRestaurant = Object.assign(new Restaurant(), {
      _id: '1',
      name: 'Test Restaurant',
      openHour: '10:00',
      closeHour: '22:00',
    });

    jest.spyOn(restaurantService, 'getRestaurant').mockReturnValue(fakeRestaurant);

    const result = resolver.getRestaurant('1');

    expect(result).toEqual(fakeRestaurant);
    expect(restaurantService.getRestaurant).toHaveBeenCalledWith('1');
  });

  it('should return reservations for restaurant', async () => {
    const fakeReservations: Reservation[] = [
      Object.assign(new Reservation(), {
        _id: 'r1',
        restaurantId: '123',
        guestName: 'John',
        date: new Date(),
      }),
    ];

    jest.spyOn(reservationService, 'getReservationsByRestaurant')
      .mockReturnValue(fakeReservations);

    const result = await resolver.reservations(
      Object.assign(new Restaurant(), {
        _id: '123',
        name: 'Fake',
        openHour: '10:00',
        closeHour: '22:00',
      }),
    );

    expect(result).toEqual(fakeReservations);
    expect(reservationService.getReservationsByRestaurant).toHaveBeenCalledWith('123');
  });

  it('should return reservation count', async () => {
    const fakeReservations: Reservation[] = [
      Object.assign(new Reservation(), {
        _id: 'r1',
        restaurantId: 'abc',
        guestName: 'John',
        date: new Date(),
      }),
      Object.assign(new Reservation(), {
        _id: 'r2',
        restaurantId: 'abc',
        guestName: 'Jane',
        date: new Date(),
      }),
    ];

    jest.spyOn(reservationService, 'getReservationsByRestaurant')
      .mockReturnValue(fakeReservations);

    const count = await resolver.reservationCount(
      Object.assign(new Restaurant(), {
        _id: 'abc',
        name: 'Fake',
        openHour: '10:00',
        closeHour: '22:00',
      }),
    );

    expect(count).toBe(2);
  });
});
