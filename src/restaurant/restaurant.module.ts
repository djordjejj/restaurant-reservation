import { forwardRef, Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { ReservationModule } from '../reservation/reservation.module';

@Module({
  imports: [forwardRef(() => ReservationModule)],
  providers: [RestaurantService, RestaurantResolver],
  exports: [RestaurantService],
})
export class RestaurantModule {}