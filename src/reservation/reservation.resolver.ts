import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { Reservation } from './reservation.schema';
import { ReservationService } from './reservation.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { GraphQLISODateTime } from '@nestjs/graphql';

@Resolver(() => Reservation)
@UseGuards(GqlAuthGuard, RolesGuard)
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  @Mutation(() => Reservation)
  createReservation(
    @Args('restaurantId', { type: () => ID }) restaurantId: string,
    @Args('date', { type: () => GraphQLISODateTime }) date: Date,
    @Args('guestName') guestName: string,
  ) {
    return this.reservationService.createReservation(restaurantId, date, guestName);
  }
}
