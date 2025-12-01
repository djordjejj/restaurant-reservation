import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ReservationModule } from './reservation/reservation.module';
import { DateScalar } from './scalars/date.scalar';
import { AuthModule } from './auth/auth.module';
import { Request } from 'express';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      context: ({ req }: { req: Request }) => ({ req }),
    }),
    AuthModule,
    RestaurantModule,
    ReservationModule,
  ],
  providers: [DateScalar],
})
export class AppModule {}
