import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationResolver } from './reservation.resolver';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
  imports: [RestaurantModule],
  providers: [ReservationService, ReservationResolver],
  exports: [ReservationService],
})
export class ReservationModule {}
