import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Reservation {
  @Field(() => ID)
  _id!: string;

  @Prop()
  @Field(() => ID)
  restaurantId!: string;

  @Prop()
  @Field()
  guestName!: string;

  @Prop()
  @Field(() => Date)
  date!: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
