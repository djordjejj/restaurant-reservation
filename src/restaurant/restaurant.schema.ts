import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Restaurant {
  @Field(() => ID)
  _id!: string;

  @Prop()
  @Field()
  name!: string;

  @Prop()
  @Field()
  openHour!: string;

  @Prop()
  @Field()
  closeHour!: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
