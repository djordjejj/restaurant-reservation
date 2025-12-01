import { Resolver, Query, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { Restaurant } from './restaurant.schema';
import { RestaurantService } from './restaurant.service';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../reservation/reservation.schema';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Resolver(() => Restaurant)
@UseGuards(GqlAuthGuard, RolesGuard)
export class RestaurantResolver {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly reservationService: ReservationService,
  ) {}

  @Query(() => Restaurant, { nullable: true })
  getRestaurant(@Args('id', { type: () => ID }) id: string) {
    return this.restaurantService.getRestaurant(id);
  }

  @ResolveField(() => [Reservation])
  async reservations(@Parent() restaurant: Restaurant) {
    return this.reservationService.getReservationsByRestaurant(restaurant._id);
  }

  @ResolveField(() => Number)
  async reservationCount(@Parent() restaurant: Restaurant) {
    const reservations = await this.reservationService.getReservationsByRestaurant(
      restaurant._id,
    );
    return reservations.length;
  }
}
