import { RestaurantService } from "src/restaurant/restaurant.service";

describe('RestaurantService', () => {
  let service: RestaurantService;

  beforeEach(() => {
    service = new RestaurantService();
  });

  it('should return undefined for missing restaurant', () => {
    const result = service.getRestaurant('invalid');
    expect(result).toBeUndefined();
  });

  it('should return a seeded restaurant', () => {
    // The RestaurantService constructor seeds one restaurant with _id '1'
    const restaurant = service.getRestaurant('1');

    expect(restaurant).toBeDefined();
    expect(restaurant?.name).toBe('Test Restaurant');
    expect(restaurant?.openHour).toBe('10:00');
    expect(restaurant?.closeHour).toBe('22:00');
  });

  it('getAll should return array of restaurants', () => {
    const all = service.getAll();
    expect(all.length).toBeGreaterThan(0);
  });
});
