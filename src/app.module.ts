import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ReservationModule } from './reservation/reservation.module';
import { AuthModule } from './auth/auth.module';
import { DateScalar } from './scalars/date.scalar';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }: { req: any }) => ({ req }),
    }),
    AuthModule,
    RestaurantModule,
    ReservationModule,
  ],
  providers: [DateScalar],
})
export class AppModule {}
